<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;

Route::get('niveis/paginado', [NivelController::class, 'paginate']);
Route::get('desenvolvedores/paginado', [DesenvolvedorController::class, 'paginate']);
Route::apiResource('niveis', NivelController::class);
Route::apiResource('desenvolvedores', DesenvolvedorController::class);
