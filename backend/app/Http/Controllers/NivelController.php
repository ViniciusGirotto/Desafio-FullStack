<?php

namespace App\Http\Controllers;

use App\Http\Resources\NivelResource;
use App\Services\NivelService;
use Illuminate\Http\Request;

class NivelController extends Controller
{
    protected $nivelService;

    public function __construct(NivelService $nivelService)
    {
        $this->nivelService = $nivelService;
    }

    /**
     * @OA\Get(
     *     path="/api/niveis",
     *     summary="Listar níveis",
     *     tags={"Níveis"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de níveis"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum nível encontrado"
     *     )
     * )
     */
    public function index()
    {
        $niveis = $this->nivelService->getAll();
        return response()->json(NivelResource::collection($niveis)->resolve(), 200);
    }
    
    /**
     * @OA\Get(
     *     path="/api/niveis/paginate",
     *     summary="Listar níveis com paginação",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número da página",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="size",
     *         in="query",
     *         description="Tamanho da página",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de níveis paginada",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="nivel", type="string")
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="total", type="integer"),
     *                 @OA\Property(property="per_page", type="integer"),
     *                 @OA\Property(property="current_page", type="integer"),
     *                 @OA\Property(property="last_page", type="integer")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum nível encontrado"
     *     )
     * )
     */    
    public function paginate(Request $request)
    {
        $page = $request->query('page', 1);
        $size = $request->query('size', 10);
        $niveis = $this->nivelService->getPagination($page, $size);
        return response()->json($niveis, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/niveis",
     *     summary="Criar nível",
     *     tags={"Níveis"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel"},
     *             @OA\Property(property="nivel", type="string", example="Junior")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Nível criado"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $nivel = $this->nivelService->create($request);
        return response()->json((new NivelResource($nivel))->resolve(), 201);
    }

    /**
     * @OA\Get(
     *     path="/api/niveis/{id}",
     *     summary="Mostrar nível",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do nível"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function show($id)
    {
        $nivel = $this->nivelService->getById($id);
        return response()->json((new NivelResource($nivel))->resolve(), 200);
    }

    /**
     * @OA\Put(
     *     path="/api/niveis/{id}",
     *     summary="Atualizar nível",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel"},
     *             @OA\Property(property="nivel", type="string", example="Pleno")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível atualizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $nivel = $this->nivelService->update($request, $id);
        return response()->json((new NivelResource($nivel))->resolve(), 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/niveis/{id}",
     *     summary="Deletar nível",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Nível deletado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function destroy($id)
    {
        try {
            $this->nivelService->delete($id);
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}