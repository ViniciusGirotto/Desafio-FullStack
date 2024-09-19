<?php

namespace Tests\Unit;

use App\Models\Desenvolvedor;
use App\Models\Nivel;
use App\Services\NivelService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;
use Mockery;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NivelServiceTest extends TestCase
{
    protected $nivelService;
    protected $nivelMock;
    protected $desenvolvedorMock;
    protected $requestMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->nivelMock = Mockery::mock('alias:App\Models\Nivel');
        $this->desenvolvedorMock = Mockery::mock('alias:App\Models\Desenvolvedor');
        $this->requestMock = Mockery::mock(Request::class);
        $this->nivelService = new NivelService();
    }

    public function testGetAllWithNiveis()
    {
        $this->nivelMock->shouldReceive('all')
            ->andReturn(collect([new Nivel()]));

        $result = $this->nivelService->getAll();

        $this->assertNotEmpty($result);
    }

    public function testGetAllWithoutNiveis()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->nivelMock->shouldReceive('all')
            ->andReturn(collect([]));

        $this->nivelService->getAll();
    }

    public function testGetPagination()
    {
        $nivel = new Nivel();
        $nivel->id = 1;
        $nivel->nivel = 'Test';
        $nivel->desenvolvedores_count = 5;

        $queryMock = Mockery::mock();
        $queryMock->shouldReceive('withCount')
            ->andReturnSelf();
        $queryMock->shouldReceive('paginate')
            ->andReturn(new \Illuminate\Pagination\LengthAwarePaginator(
                [$nivel],
                1,
                10,
                1
            ));

        $this->nivelMock->shouldReceive('query')
            ->andReturn($queryMock);

        $result = $this->nivelService->getPagination(1, 10);

        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('meta', $result);
    }

    public function testCreate()
    {
        $this->requestMock->shouldReceive('validate')->andReturn(true);
        $this->requestMock->shouldReceive('all')->andReturn([
            'nivel' => 'Test'
        ]);

        $this->nivelMock->shouldReceive('create')
            ->andReturn(new Nivel());

        $result = $this->nivelService->create($this->requestMock);

        $this->assertInstanceOf(Nivel::class, $result);
    }

    public function testGetById()
    {
        $this->nivelMock->shouldReceive('findOrFail')
            ->andReturn(new Nivel());

        $result = $this->nivelService->getById(1);

        $this->assertInstanceOf(Nivel::class, $result);
    }

    public function testGetByIdNotFound()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->nivelMock->shouldReceive('findOrFail')
            ->andThrow(new ModelNotFoundException());

        try {
            $this->nivelService->getById(999);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException('Nível não encontrado.', $e);
        }
    }

    public function testUpdate()
    {
        $this->requestMock->shouldReceive('validate')->andReturn(true);
        $this->requestMock->shouldReceive('all')->andReturn([
            'nivel' => 'Test'
        ]);

        $this->nivelMock->shouldReceive('findOrFail')
            ->andReturn($this->nivelMock);

        $this->nivelMock->shouldReceive('update')
            ->andReturn(true);

        $result = $this->nivelService->update($this->requestMock, 1);

        $this->assertInstanceOf(Nivel::class, $result);
    }

    public function testUpdateNotFound()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->requestMock->shouldReceive('validate')->andReturn(true);

        $this->nivelMock->shouldReceive('findOrFail')
            ->andThrow(new ModelNotFoundException());

        try {
            $this->nivelService->update($this->requestMock, 999);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException('Nível não encontrado.', $e);
        }
    }

    public function testDelete()
    {
        $this->nivelMock->shouldReceive('findOrFail')
            ->andReturn($this->nivelMock);

        $this->desenvolvedorMock->shouldReceive('where->exists')
            ->andReturn(false);

        $this->nivelMock->shouldReceive('delete')
            ->andReturn(true);

        $result = $this->nivelService->delete(1);

        $this->assertNull($result);
    }

    public function testDeleteWithDevelopers()
    {
        $this->expectException(\Exception::class);

        $this->nivelMock->shouldReceive('findOrFail')
            ->andReturn($this->nivelMock);

        $this->desenvolvedorMock->shouldReceive('where->exists')
            ->andReturn(true);

        $this->nivelService->delete(1);
    }

    public function testDeleteNotFound()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->nivelMock->shouldReceive('findOrFail')
            ->andThrow(new ModelNotFoundException());

        try {
            $this->nivelService->delete(999);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException('Nível não encontrado.', $e);
        }
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}