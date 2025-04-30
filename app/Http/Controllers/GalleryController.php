<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return Gallery::all();
    }

    public function store(Request $request)
    {
        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('Carousel'), $filename);
                $imagePaths[] = '/Carousel/' . $filename;
            }
        }

        return Gallery::create([
            'gallery_name' => $request->gallery_name,
            'images' => $imagePaths
        ]);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);
    
        // Get images currently saved in DB
        $currentImages = $gallery->images ?? [];
    
        // Get existing_images from the request (i.e., ones the user chose to keep)
        $existingImages = $request->input('existing_images', []);
    
        // Determine which images to delete from public folder
        $removedImages = array_diff($currentImages, $existingImages);
    
        foreach ($removedImages as $removedImage) {
            $imagePath = public_path($removedImage);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
    
        // Start with existing images the user kept
        $finalImages = $existingImages;
    
        // Handle new uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('Carousel'), $filename);
                $finalImages[] = '/Carousel/' . $filename;
            }
        }
    
        // Update gallery
        $gallery->update([
            'gallery_name' => $request->gallery_name,
            'images' => $finalImages,
        ]);
    
        return $gallery;
    }    
    

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return response()->json(['success' => true]);
    }

    public function enable($id)
    {
        // Disable all galleries first
        Gallery::where('status', 1)->update(['status' => 0]);

        // Enable the selected gallery
        $gallery = Gallery::findOrFail($id);
        $gallery->status = 1;
        $gallery->save();

        return response()->json(['message' => 'Gallery enabled successfully.']);
    }

    public function enabled()
    {
        $gallery = Gallery::where('status', 1)->first();
        return response()->json($gallery);
    }

}