<?php

namespace App\Services;

use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NivelService
{
    public function getAll()
    {
        $niveis = Nivel::all();

        if ($niveis->isEmpty()) {
            throw new NotFoundHttpException('Nenhum nível encontrado.');
        }

        return $niveis;
    }

    public function create(Request $request)
    {
        $request->validate(['nivel' => 'required|string']);
        return Nivel::create($request->all());
    }

    public function getById($id)
    {
        return Nivel::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['nivel' => 'required|string']);
        $nivel = Nivel::findOrFail($id);
        $nivel->update($request->all());
        return $nivel;
    }

    public function delete($id)
    {
        $nivel = Nivel::findOrFail($id);

     
        if (Desenvolvedor::where('nivel_id', $id)->exists()) {
            throw new \Exception('Não é possível remover o nível, pois existem desenvolvedores associados a ele.');
        }

        $nivel->delete();
    }
}