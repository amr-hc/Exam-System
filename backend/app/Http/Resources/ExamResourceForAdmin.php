<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResourceForAdmin extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'duration' => $this->duration,
            'started_at' => $this->started_at,
            'expire_at' => $this->expire_at,
            'questions' => $this->questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'degree' => $question->degree,
                    'question' => $question->question,
                    'answers' => $question->answers->map(function ($answer) {
                        return [
                            'id' => $answer->id,
                            'answer' => $answer->answer,
                            'is_correct' => $answer->is_correct,
                        ];
                    }),
                ];
            }),
        ];
    }
}
