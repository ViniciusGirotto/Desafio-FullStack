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