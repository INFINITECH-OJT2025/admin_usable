<?php

namespace App\Http\Controllers;

use App\Models\Adminreusable;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class AdminreusableController extends Controller
{
    public function index()
    {
        return Adminreusable::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
        ]);

        // Handle file upload
        $fileName = null;
        return Adminreusable::create([
            'id' => $request->id,
            'full_name' => $request->full_name,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Adminreusable::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required',
        ]);

        // Find the existing record
        $model = Adminreusable::findOrFail($id);

        $model->update([
            'id' => $request->id,
            'full_name' => $request->full_name,
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
        $model = Adminreusable::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
