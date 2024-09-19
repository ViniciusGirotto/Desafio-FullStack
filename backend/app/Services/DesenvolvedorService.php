<?php

namespace App\Services;

use App\Models\Desenvolvedor;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DesenvolvedorService
{
    public function getAll()
    {
        $desenvolvedores = Desenvolvedor::with('nivel')->get();

        if ($desenvolvedores->isEmpty()) {
            throw new NotFoundHttpException('Nenhum desenvolvedor encontrado.');
        }

        return $desenvolvedores;
    }
    public function getPagination($page, $size)
    {
        $desenvolvedores = Desenvolvedor::with('nivel')->paginate($size, ['*'], 'page', $page);

        return [
            'data' => $desenvolvedores->items(),
            'meta' => [
                'total' => $desenvolvedores->total(),
                'per_page' => $desenvolvedores->perPage(),
                'current_page' => $desenvolvedores->currentPage(),
                'last_page' => $desenvolvedores->lastPage()
            ]
        ];
    }

    public function create(Request $request)
    {
        $request->validate([
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string',
            'sexo' => 'required|string',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string'
        ]);

        $dataNascimento = new \DateTime($request->data_nascimento);
        $hoje = new \DateTime();
        $idade = $hoje->diff($dataNascimento)->y;

        $desenvolvedor = Desenvolvedor::create([
            'nivel_id' => $request->nivel_id,
            'nome' => $request->nome,
            'sexo' => $request->sexo,
            'data_nascimento' => $request->data_nascimento,
            'idade' => $idade,
            'hobby' => $request->hobby
        ]);

        return $desenvolvedor;
    }

    public function getById($id)
    {
        return Desenvolvedor::with('nivel')->findOrFail($id);
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

        // Calcular a idade com base na data de nascimento
        $dataNascimento = new \DateTime($request->data_nascimento);
        $hoje = new \DateTime();
        $idade = $hoje->diff($dataNascimento)->y;

        $desenvolvedor->update([
            'nivel_id' => $request->nivel_id,
            'nome' => $request->nome,
            'sexo' => $request->sexo,
            'data_nascimento' => $request->data_nascimento,
            'idade' => $idade,
            'hobby' => $request->hobby
        ]);

        return $desenvolvedor;
    }

    public function delete($id)
    {
        $desenvolvedor = Desenvolvedor::findOrFail($id);
        $desenvolvedor->delete();
    }
}