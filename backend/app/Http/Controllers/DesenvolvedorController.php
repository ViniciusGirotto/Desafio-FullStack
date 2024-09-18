<?php
namespace App\Http\Controllers;

use App\Models\Desenvolvedor;
use Illuminate\Http\Request;

class DesenvolvedorController extends Controller
{
    public function index()
    {
        $desenvolvedores = Desenvolvedor::with('nivel')->get();
        return response()->json($desenvolvedores, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string',
            'sexo' => 'required|string',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string'
        ]);
        $desenvolvedor = Desenvolvedor::create($request->all());
        return response()->json($desenvolvedor, 201);
    }

    public function show($id)
    {
        $desenvolvedor = Desenvolvedor::with('nivel')->findOrFail($id);
        return response()->json($desenvolvedor, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string',
            'sexo' => 'required|string',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string'
        ]);
        $desenvolvedor = Desenvolvedor::findOrFail($id);
        $desenvolvedor->update($request->all());
        return response()->json($desenvolvedor, 200);
    }

    public function destroy($id)
    {
        $desenvolvedor = Desenvolvedor::findOrFail($id);
        $desenvolvedor->delete();
        return response()->json(null, 204);
    }
}