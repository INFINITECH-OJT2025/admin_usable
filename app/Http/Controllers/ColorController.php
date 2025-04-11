<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Color; // Make sure to create a Color model
use Illuminate\Support\Facades\Validator;

class ColorController extends Controller
{
    public function addColor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'color' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Check if the color already exists
        $existingColor = Color::where('color', $request->color)->first();
        if ($existingColor) {
            return;
        }
    
        $color = Color::create($request->only('color', 'status'));
        return response()->json($color, 201);
    }

    public function deleteColor($id)
    {
        $color = Color::find($id);
        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }
    
        try {
            $color->delete();
            return response()->json(['message' => 'Color deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete color.'], 500);
        }
    }

    public function getColors()
    {
        return response()->json(Color::all());
    }

    public function updateColor(Request $request, $id)
    {
        $color = Color::find($id);
        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }
    
        // Validate the request
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:active,inactive',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $newStatus = $request->input('status');
    
        if ($newStatus === 'active') {
            Color::where('id', '!=', $id)->update(['status' => 'inactive']);
        }
    
        $color->status = $newStatus;
        $color->save();
    
        return response()->json($color, 200);
    }

    public function getActiveColor()
    {
        // Fetch the color with status 'active'
        $activeColor = Color::where('status', 'active')->first();

        if (!$activeColor) {
            return response()->json(['message' => 'No active color found'], 404);
        }

        return response()->json($activeColor, 200);
    }
}
