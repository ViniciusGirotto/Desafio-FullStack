<?php

namespace App\Http\Controllers;

use App\Http\Resources\DesenvolvedorResource;
use App\Services\DesenvolvedorService;
use Illuminate\Http\Request;


class DesenvolvedorController extends Controller
{
    protected $desenvolvedorService;

    public function __construct(DesenvolvedorService $desenvolvedorService)
    {
        $this->desenvolvedorService = $desenvolvedorService;
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores",
     *     summary="Listar desenvolvedores",
     *     tags={"Desenvolvedores"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de desenvolvedores"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum desenvolvedor encontrado"
     *     )
     * )
     */
    public function index()
    {
        $desenvolvedores = $this->desenvolvedorService->getAll();
        return response()->json(DesenvolvedorResource::collection($desenvolvedores)->resolve(), 200);  
    }

    /**
     * @OA\Post(
     *     path="/api/desenvolvedores",
     *     summary="Criar desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel_id", "nome", "sexo", "data_nascimento", "hobby"},
     *             @OA\Property(property="nivel_id", type="integer", example=1),
     *             @OA\Property(property="nome", type="string", example="John Doe"),
     *             @OA\Property(property="sexo", type="string", example="M"),
     *             @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="hobby", type="string", example="Programação")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Desenvolvedor criado"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $desenvolvedor = $this->desenvolvedorService->create($request);
        return new DesenvolvedorResource($desenvolvedor);
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Mostrar desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do desenvolvedor"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function show($id)
    {
        $desenvolvedor = $this->desenvolvedorService->getById($id);
        return new DesenvolvedorResource($desenvolvedor);
    }

    /**
     * @OA\Put(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Atualizar desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel_id", "nome", "sexo", "data_nascimento", "hobby"},
     *             @OA\Property(property="nivel_id", type="integer", example=1),
     *             @OA\Property(property="nome", type="string", example="John Doe"),
     *             @OA\Property(property="sexo", type="string", example="M"),
     *             @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="hobby", type="string", example="Programação")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor atualizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $desenvolvedor = $this->desenvolvedorService->update($request, $id);
        return new DesenvolvedorResource($desenvolvedor);
    }

    /**
     * @OA\Delete(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Deletar desenvolvedor",
     *      tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Desenvolvedor deletado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function destroy($id)
    {
        $this->desenvolvedorService->delete($id);
        return response()->json(null, 204);
    }
}