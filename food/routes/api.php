<?php

use App\Http\Controllers\FoodController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('foods', [FoodController::class, 'all']);
Route::get('foods/{id}', [FoodController::class, 'get']);
Route::get('statistical', [FoodController::class, 'getStatistical']);
Route::post('foodSearch', [FoodController::class, 'searchFood']);
