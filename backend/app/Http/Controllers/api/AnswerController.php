<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerResource;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnswerResource::collection(Answer::all());

    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Answer::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Answer $answer)
    {
        return new AnswerResource($answer);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Answer $answer)
    {
        return $answer->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        //
    }
}
