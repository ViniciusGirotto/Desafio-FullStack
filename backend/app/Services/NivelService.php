<?php

namespace App\Services;

use App\Models\Nivel;
use Illuminate\Http\Request;

class NivelService
{
    public function getAll()
    {
        return Nivel::all();
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
        if ($nivel->desenvolvedores()->count() > 0) {
            throw new \Exception('Nível possui desenvolvedores associados');
        }
        $nivel->delete();
    }
}