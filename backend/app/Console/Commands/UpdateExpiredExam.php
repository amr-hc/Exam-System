<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use App\Models\exam_student;
use App\Models\Exam;



class UpdateExpiredExam extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-expired-exam';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        DB::table('exams')->join('exam_student','exams.id','=','exam_student.exam_id')
        ->where('exam_student.status','=','pending')
        ->where('exams.expire_at','<=',$now)
        ->update(['exam_student.status' => 'expired']);

        $this->info('Expired tasks have been updated.');

    }
}
