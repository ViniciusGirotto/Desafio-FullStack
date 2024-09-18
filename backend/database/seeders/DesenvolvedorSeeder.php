<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Faker\Factory as Faker;

class DesenvolvedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $niveis = Nivel::all();

        if ($niveis->isEmpty()) {
            $this->command->info('Nenhum nível encontrado. Execute o seeder de níveis primeiro.');
            return;
        }

        foreach (range(1, 10) as $index) {
            $dataNascimento = $faker->dateTimeBetween('-40 years', '-20 years');
            $idade = $dataNascimento->diff(new \DateTime())->y;

            Desenvolvedor::create([
                'nivel_id' => $niveis->random()->id,
                'nome' => $faker->name,
                'sexo' => $faker->randomElement(['M', 'F']),
                'data_nascimento' => $dataNascimento->format('Y-m-d'),
                'idade' => $idade,
                'hobby' => $faker->word
            ]);
        }
    }
}