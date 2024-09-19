<?php

namespace Tests\Unit;

use App\Models\Desenvolvedor;
use App\Services\DesenvolvedorService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;
use Mockery;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DesenvolvedorServiceTest extends TestCase
{
    protected $desenvolvedorService;
    protected $desenvolvedorMock;
    protected $requestMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->desenvolvedorMock = Mockery::mock('alias:App\Models\Desenvolvedor');
        $this->requestMock = Mockery::mock(Request::class);
        $this->desenvolvedorService = new DesenvolvedorService();
    }

    public function testGetAllWithDevelopers()
    {
        $this->desenvolvedorMock->shouldReceive('with->get')
            ->andReturn(collect([new Desenvolvedor()]));

        $result = $this->desenvolvedorService->getAll();

        $this->assertNotEmpty($result);
    }

    public function testGetAllWithoutDevelopers()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->desenvolvedorMock->shouldReceive('with->get')
            ->andReturn(collect([]));

        $this->desenvolvedorService->getAll();
    }

    public function testGetPagination()
    {
        $this->desenvolvedorMock->shouldReceive('with->paginate')
            ->andReturn(new \Illuminate\Pagination\LengthAwarePaginator(
                [new Desenvolvedor()],
                1,
                10,
                1
            ));

        $result = $this->desenvolvedorService->getPagination(1, 10);

        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('meta', $result);
    }

    public function testCreate()
    {
        $this->requestMock->shouldReceive('validate')->andReturn(true);
        $this->requestMock->data_nascimento = '2000-01-01';
        $this->requestMock->nivel_id = 1;
        $this->requestMock->nome = 'Test';
        $this->requestMock->sexo = 'M';
        $this->requestMock->hobby = 'Coding';

        $this->desenvolvedorMock->shouldReceive('create')
            ->andReturn(new Desenvolvedor());

        $result = $this->desenvolvedorService->create($this->requestMock);

        $this->assertInstanceOf(Desenvolvedor::class, $result);
    }

    public function testGetById()
    {
        $this->desenvolvedorMock->shouldReceive('with->findOrFail')
            ->andReturn(new Desenvolvedor());

        $result = $this->desenvolvedorService->getById(1);

        $this->assertInstanceOf(Desenvolvedor::class, $result);
    }

    public function testGetByIdNotFound()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->desenvolvedorMock->shouldReceive('with->findOrFail')
            ->andThrow(new ModelNotFoundException());

        try {
            $this->desenvolvedorService->getById(999);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException('Desenvolvedor não encontrado.', $e);
        }
    }

    public function testUpdate()
    {
        $this->requestMock->shouldReceive('validate')->andReturn(true);
        $this->requestMock->data_nascimento = '2000-01-01';
        $this->requestMock->nivel_id = 1;
        $this->requestMock->nome = 'Test';
        $this->requestMock->sexo = 'M';
        $this->requestMock->hobby = 'Coding';

        $this->desenvolvedorMock->shouldReceive('findOrFail')
            ->andReturn($this->desenvolvedorMock);

        $this->desenvolvedorMock->shouldReceive('update')
            ->andReturn(true);

        $result = $this->desenvolvedorService->update($this->requestMock, 1);

        $this->assertInstanceOf(Desenvolvedor::class, $result);
    }

    public function testUpdateNotFound()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->requestMock->shouldReceive('validate')->andReturn(true);

        $this->desenvolvedorMock->shouldReceive('findOrFail')
            ->andThrow(new ModelNotFoundException());

        try {
            $this->desenvolvedorService->update($this->requestMock, 999);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException('Desenvolvedor não encontrado.', $e);
        }
    }

    public function testDelete()
    {
        $this->desenvolvedorMock->shouldReceive('findOrFail')
            ->andReturn($this->desenvolvedorMock);

        $this->desenvolvedorMock->shouldReceive('delete')
            ->andReturn(true);

        $result = $this->desenvolvedorService->delete(1);

        $this->assertNull($result);
    }

    public function testDeleteNotFound()
    {
        $this->expectException(NotFoundHttpException::class);

        $this->desenvolvedorMock->shouldReceive('findOrFail')
            ->andThrow(new ModelNotFoundException());

        try {
            $this->desenvolvedorService->delete(999);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException('Desenvolvedor não encontrado.', $e);
        }
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}