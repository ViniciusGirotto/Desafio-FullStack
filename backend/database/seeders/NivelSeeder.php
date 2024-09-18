<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nivel;

class NivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $niveis = [
            ['nivel' => 'Junior'],
            ['nivel' => 'Pleno'],
            ['nivel' => 'Senior'],
            ['nivel' => 'Especialista']
        ];

        foreach ($niveis as $nivel) {
            Nivel::create($nivel);
        }
    }
}