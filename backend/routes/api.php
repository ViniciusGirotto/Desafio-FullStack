<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;

Route::apiResource('niveis', NivelController::class);
Route::apiResource('desenvolvedores', DesenvolvedorController::class);

