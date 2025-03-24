<?php

namespace App\Http\Controllers;

use App\Models\Try_table;
use Illuminate\Http\Request;

class Try_tableController extends Controller
{
    public function index()
    {
        return Try_table::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fullname' => 'required',
            'email' => 'required',
            'birthdate' => 'required',
        ]);

        return Try_table::create($validatedData);
    }

    public function show($id)
    {
        return Try_table::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'fullname' => 'required',
            'email' => 'required',
            'birthdate' => 'required',
        ]);

        $model = Try_table::findOrFail($id);
        $model->update($validatedData);

        return $model;
    }

    public function destroy($id)
    {
        $model = Try_table::findOrFail($id);
        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
