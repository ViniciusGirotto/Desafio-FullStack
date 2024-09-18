<?php

namespace App\Http\Controllers;

use App\Services\DesenvolvedorService;
use Illuminate\Http\Request;

class DesenvolvedorController extends Controller
{
    protected $desenvolvedorService;

    public function __construct(DesenvolvedorService $desenvolvedorService)
    {
        $this->desenvolvedorService = $desenvolvedorService;
    }

    public function index()
    {
        $desenvolvedores = $this->desenvolvedorService->getAll();
        return response()->json($desenvolvedores, 200);
    }

    public function store(Request $request)
    {
        $desenvolvedor = $this->desenvolvedorService->create($request);
        return response()->json($desenvolvedor, 201);
    }

    public function show($id)
    {
        $desenvolvedor = $this->desenvolvedorService->getById($id);
        return response()->json($desenvolvedor, 200);
    }

    public function update(Request $request, $id)
    {
        $desenvolvedor = $this->desenvolvedorService->update($request, $id);
        return response()->json($desenvolvedor, 200);
    }

    public function destroy($id)
    {
        $this->desenvolvedorService->delete($id);
        return response()->json(null, 204);
    }
}