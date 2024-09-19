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

    public function getPagination($page, $size, $search = null)
    {
        $query = Nivel::query();
    
        if ($search) {
            $query->where('nivel', 'like', '%' . $search . '%');
        }

        $query->withCount('desenvolvedores');
    
        $niveis = $query->paginate($size, ['*'], 'page', $page);
    
        $niveis->getCollection()->transform(function ($nivel) {
            return [
                'id' => $nivel->id,
                'nivel' => $nivel->nivel,
                'devCount' => $nivel->desenvolvedores_count
            ];
        });
    
        return [
            'data' => $niveis->items(),
            'meta' => [
                'total' => $niveis->total(),
                'per_page' => $niveis->perPage(),
                'current_page' => $niveis->currentPage(),
                'last_page' => $niveis->lastPage()
            ]
        ];
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