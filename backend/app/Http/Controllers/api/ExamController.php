<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResource;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ExamResource::collection(Exam::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Exam::create($request->all());

    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        return new ExamResource($exam);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        return $exam->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        //
    }
}
