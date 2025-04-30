<?php

namespace App\Http\Controllers;

use App\Models\Radio_try;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Radio_tryController extends Controller
{
    public function index()
    {
        return Radio_try::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'radio' => 'required',
        ]);

        // Handle file upload
        $fileName = null;
        return Radio_try::create([
            'id' => $request->id,
            'radio' => $request->radio,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Radio_try::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'radio' => 'required',
        ]);

        // Find the existing record
        $model = Radio_try::findOrFail($id);

        $model->update([
            'id' => $request->id,
            'radio' => $request->radio,
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
        $model = Radio_try::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
