<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;

Route::get('niveis/paginate', [NivelController::class, 'paginate']);
Route::get('desenvolvedores/paginate', [DesenvolvedorController::class, 'paginate']);
Route::apiResource('niveis', NivelController::class);
Route::apiResource('desenvolvedores', DesenvolvedorController::class);
