<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\api\usersController;
use App\Http\Controllers\api\AnswerController;
use App\Http\Controllers\api\ExamController;
use App\Http\Controllers\api\QuestionController;
use App\Http\Controllers\api\ExamStudentController;
use App\Http\Controllers\api\StudentAnswerController;
use App\Http\Resources\UserResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
    return ["user" => new UserResource($user), "token" => $user->createToken($request->device_name)->plainTextToken];
});


Route::apiResource('users', usersController::class);

Route::apiResource('exams', ExamController::class);
Route::apiResource('questions', QuestionController::class);
Route::apiResource('answers', AnswerController::class);

Route::GET('exams/{exam}/results',[ExamController::class,'showResult']);

Route::GET('exams/{exam}/students/{student}',[ExamStudentController::class,'assignExam']);
Route::GET('unassign/exams/{exam}/students/{student}',[ExamStudentController::class,'unassignExam']);
Route::GET('exam_student',[ExamStudentController::class,'index']);
Route::GET('exam_student/{exam}/{student}',[ExamStudentController::class,'show']);
Route::GET('exam_student/mine',[ExamStudentController::class,'showUserExams']);


Route::GET('answer/{answer}/students/{student}',[StudentAnswerController::class,'assignAnswer']);
Route::GET('unassign/answer/{answer}/students/{student}',[StudentAnswerController::class,'unassignAnswer']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/assignanswers',[StudentAnswerController::class,'assignAllAnswers']) ;
    Route::post('/assignOneanswer',[StudentAnswerController::class,'assignAnswer']); 
    Route::post('/assignOneanswer',[StudentAnswerController::class,'unassignAnswer']);
});


