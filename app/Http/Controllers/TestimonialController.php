<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // Get all testimonials
    public function index()
    {
        return Testimonial::all();
    }

    // Toggle visibility of a testimonial
    public function toggleVisibility($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->is_visible = !$testimonial->is_visible;
        $testimonial->save();

        return response()->json(['success' => true, 'visible' => $testimonial->is_visible]);
    }

    // Store a new testimonial
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
            'is_visible' => 'required|boolean',
        ]);

        $testimonial = Testimonial::create($request->all());

        return response()->json($testimonial, 201);
    }

    // Update an existing testimonial
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
            'is_visible' => 'required|boolean',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->all());

        return response()->json($testimonial);
    }

    // Delete a testimonial
    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return response()->json(['success' => true]);
    }
}