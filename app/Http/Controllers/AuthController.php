<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{


    public function index()
    {
        // Fetch all users
        $users = User::where('usertype', 'user')->get();

        // Return response as JSON
        return response()->json($users);
    }


    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'username' => 'required|string|max:255|unique:users',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'password' => 'required|string|min:6',
    //         'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Image validation
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     // Handle file upload
    //     $imagePath = null;
    //     if ($request->hasFile('profile_image')) {
    //         $image = $request->file('profile_image');
    //         $imagePath = $image->store('profile_images', 'public'); // Save to storage/app/public/profile_images
    //     }

    //     // Create user
    //     $user = User::create([
    //         'username' => $request->username,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //         'profile_image' => $imagePath, // Save path in DB
    //         'usertype' => 'user', // Default user type
    //     ]);

    //     return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    // }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'fullname' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Image validation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle file upload
        $imagePath = null;
        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $imageName = time() . '_' . $image->getClientOriginalName(); // Unique filename
            $image->move(public_path('profile_images'), $imageName); // Save in public/profile_images
            $imagePath = 'profile_images/' . $imageName; // Path stored in DB
        }

        // Create user
        $user = User::create([
            'username' => $request->username,
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'profile_image' => $imagePath, // Save relative path in DB
            'usertype' => 'user', // Default user type
        ]);

        return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    }



    public function login(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);
    
        // Retrieve the user based on the username
        $user = User::where('username', $request->username)->first();
    
        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Generate the authToken
        $token = $user->createToken('authToken')->plainTextToken;
    
        // Update the user's authToken in the database
        $user->authToken = $token;
        $user->save();
    
        // Return the response with the user details, usertype, and generated token
        return response()->json([
            'user' => $user,
            'usertype' => $user->usertype,  // Add usertype to the response
            'token' => $token,
            'status' => $user->status 
        ]);
    }
    

    // Logout function
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
