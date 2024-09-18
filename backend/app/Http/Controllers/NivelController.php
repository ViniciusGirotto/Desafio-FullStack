<?php

namespace App\Http\Controllers;

use App\Services\NivelService;
use Illuminate\Http\Request;

class NivelController extends Controller
{
    protected $nivelService;

    public function __construct(NivelService $nivelService)
    {
        $this->nivelService = $nivelService;
    }

    public function index()
    {
        $niveis = $this->nivelService->getAll();
        return response()->json($niveis, 200);
    }

    public function store(Request $request)
    {
        $nivel = $this->nivelService->create($request);
        return response()->json($nivel, 201);
    }

    public function show($id)
    {
        $nivel = $this->nivelService->getById($id);
        return response()->json($nivel, 200);
    }

    public function update(Request $request, $id)
    {
        $nivel = $this->nivelService->update($request, $id);
        return response()->json($nivel, 200);
    }

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