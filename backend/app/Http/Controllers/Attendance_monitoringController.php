<?php

namespace App\Http\Controllers;

use App\Models\Attendance_monitoring;
use Illuminate\Http\Request;

class Attendance_monitoringController extends Controller
{
    public function index()
    {
        return Attendance_monitoring::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fullname' => 'required',
            'section' => 'required',
            'email' => 'required',
            'subject' => 'required',
            'birthdate' => 'required',
        ]);

        return Attendance_monitoring::create($validatedData);
    }

    public function show($id)
    {
        return Attendance_monitoring::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'fullname' => 'required',
            'section' => 'required',
            'email' => 'required',
            'subject' => 'required',
            'birthdate' => 'required',
        ]);

        $model = Attendance_monitoring::findOrFail($id);
        $model->update($validatedData);

        return $model;
    }

    public function destroy($id)
    {
        $model = Attendance_monitoring::findOrFail($id);
        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
