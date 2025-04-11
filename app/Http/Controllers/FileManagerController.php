<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class FileManagerController extends Controller
{
    private $publicPath;

    public function __construct()
    {
        $this->publicPath = public_path();
    }

    public function listFiles(Request $request)
    {
        $directory = $request->query('path', '');
        $path = $this->publicPath . '/' . $directory;

        if (!File::exists($path)) {
            return response()->json(['error' => 'Directory not found'], Response::HTTP_NOT_FOUND);
        }

        $files = collect(File::files($path))->map(function ($file) {
            return [
                'name' => $file->getFilename(),
                'path' => str_replace(public_path(), '', $file->getPathname()),
                'size' => $file->getSize(),
                'type' => File::mimeType($file->getPathname()),
                'last_modified' => date('Y-m-d H:i:s', $file->getMTime())
            ];
        });

        $folders = collect(File::directories($path))->map(function ($folder) {
            return [
                'name' => basename($folder),
                'path' => str_replace(public_path(), '', $folder),
                'type' => 'folder'
            ];
        });

        return response()->json(['files' => $files, 'folders' => $folders]);
    }






    public function createFolder(Request $request)
    {
        $request->validate(['folder_name' => 'required']);
        $path = $this->publicPath . '/' . $request->folder_name;

        if (File::exists($path)) {
            return response()->json(['error' => 'Folder already exists'], Response::HTTP_CONFLICT);
        }

        File::makeDirectory($path, 0777, true);
        return response()->json(['message' => 'Folder created successfully']);
    }

    public function renameFolder(Request $request)
    {
        $request->validate(['old_name' => 'required', 'new_name' => 'required']);
        $oldPath = $this->publicPath . '/' . $request->old_name;
        $newPath = $this->publicPath . '/' . $request->new_name;

        if (!File::exists($oldPath)) {
            return response()->json(['error' => 'Folder not found'], Response::HTTP_NOT_FOUND);
        }

        File::move($oldPath, $newPath);
        return response()->json(['message' => 'Folder renamed successfully']);
    }

    public function deleteFolder(Request $request)
    {
        $request->validate(['folder' => 'required']);
        $path = $this->publicPath . '/' . $request->folder;

        if (!File::exists($path)) {
            return response()->json(['error' => 'Folder not found'], Response::HTTP_NOT_FOUND);
        }

        File::deleteDirectory($path);
        return response()->json(['message' => 'Folder deleted successfully']);
    }


    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'path' => 'required|string', // Validate the path
        ]);
    
        $file = $request->file('file');
        $path = $request->input('path'); // Get the path from the request
    
        // Ensure the path is safe and exists
        $fullPath = public_path($path);
        if (!is_dir($fullPath)) {
            return response()->json(['message' => 'Invalid path'], 400);
        }
    
        // Move the file to the specified path
        $file->move($fullPath, $file->getClientOriginalName());
    
        return response()->json(['message' => 'File uploaded successfully']);
    }
    
    public function renameFile(Request $request)
    {
        $request->validate(['old_name' => 'required', 'new_name' => 'required']);

        $oldPath = $this->publicPath . '/' . $request->old_name;
        $newPath = $this->publicPath . '/' . $request->new_name;

        if (!File::exists($oldPath)) {
            return response()->json(['error' => 'File not found'], Response::HTTP_NOT_FOUND);
        }

        File::move($oldPath, $newPath);
        return response()->json(['message' => 'File renamed successfully']);
    }

    public function deleteFile(Request $request)
    {
        $request->validate(['file' => 'required']);
        $path = $this->publicPath . '/' . $request->file;

        if (!File::exists($path)) {
            return response()->json(['error' => 'File not found'], Response::HTTP_NOT_FOUND);
        }

        File::delete($path);
        return response()->json(['message' => 'File deleted successfully']);
    }

    public function fileProperties(Request $request)
    {
        $request->validate(['file' => 'required']);
        $path = $this->publicPath . '/' . $request->file;

        if (!File::exists($path)) {
            return response()->json(['error' => 'File not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'name' => basename($path),
            'size' => File::size($path),
            'type' => File::mimeType($path),
            'last_modified' => date('Y-m-d H:i:s', File::lastModified($path))
        ]);
    }
}
