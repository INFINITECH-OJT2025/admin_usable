<?php

namespace App\Http\Controllers;

use App\Models\Input_longer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Input_longerController extends Controller
{
    public function index()
    {
        return Input_longer::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'asd' => 'required',
            'sadsdda' => 'required',
            'sasdad' => 'required',
        ]);

        // Handle file upload
        $fileName = null;
        return Input_longer::create([
            'id' => $request->id,
            'asd' => $request->asd,
            'sadsdda' => $request->sadsdda,
            'sasdad' => $request->sasdad,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Input_longer::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'asd' => 'required',
            'sadsdda' => 'required',
            'sasdad' => 'required',
        ]);

        // Find the existing record
        $model = Input_longer::findOrFail($id);

        $model->update([
            'id' => $request->id,
            'asd' => $request->asd,
            'sadsdda' => $request->sadsdda,
            'sasdad' => $request->sasdad,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);

        return response()->json([
            'message' => 'Record updated successfully!',
            'data' => $model,
        ]);
    }

    public function destroy($id)
    {
        $model = Input_longer::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
