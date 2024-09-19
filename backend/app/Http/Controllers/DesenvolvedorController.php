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

    public function index()
    {
        $desenvolvedores = $this->desenvolvedorService->getAll();
        return response()->json(DesenvolvedorResource::collection($desenvolvedores)->resolve(), 200);
    }

    public function store(Request $request)
    {
        $desenvolvedor = $this->desenvolvedorService->create($request);
        return new DesenvolvedorResource($desenvolvedor);
    }

    public function show($id)
    {
        $desenvolvedor = $this->desenvolvedorService->getById($id);
        return new DesenvolvedorResource($desenvolvedor);
    }

    public function update(Request $request, $id)
    {
        $desenvolvedor = $this->desenvolvedorService->update($request, $id);
        return new DesenvolvedorResource($desenvolvedor);
    }

    public function destroy($id)
    {
        $this->desenvolvedorService->delete($id);
        return response()->json(null, 204);
    }
}