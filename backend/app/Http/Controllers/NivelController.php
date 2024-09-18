<?php
namespace App\Http\Controllers;

use App\Models\Nivel;
use Illuminate\Http\Request;

class NivelController extends Controller
{
    public function index()
    {
        $niveis = Nivel::all();
        return response()->json($niveis, 200);
    }

    public function store(Request $request)
    {
        $request->validate(['nivel' => 'required|string']);
        $nivel = Nivel::create($request->all());
        return response()->json($nivel, 201);
    }

    public function show($id)
    {
        $nivel = Nivel::findOrFail($id);
        return response()->json($nivel, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['nivel' => 'required|string']);
        $nivel = Nivel::findOrFail($id);
        $nivel->update($request->all());
        return response()->json($nivel, 200);
    }

    public function destroy($id)
    {
        $nivel = Nivel::findOrFail($id);
        if ($nivel->desenvolvedores()->count() > 0) {
            return response()->json(['error' => 'Nível possui desenvolvedores associados'], 400);
        }
        $nivel->delete();
        return response()->json(null, 204);
    }
}