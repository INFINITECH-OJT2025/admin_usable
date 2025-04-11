<?php

namespace App\Http\Controllers;

use App\Models\Mikmik;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class MikmikController extends Controller
{
    public function index()
    {
        return Mikmik::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'your_age' => 'required',
        ]);

        // Handle file upload
        $fileName = null;
        return Mikmik::create([
            'id' => $request->id,
            'full_name' => $request->full_name,
            'your_age' => $request->your_age,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Mikmik::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required',
            'your_age' => 'required',
        ]);

        // Find the existing record
        $model = Mikmik::findOrFail($id);

        $model->update([
            'id' => $request->id,
            'full_name' => $request->full_name,
            'your_age' => $request->your_age,
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
        $model = Mikmik::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
