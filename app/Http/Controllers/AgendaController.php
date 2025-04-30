<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    public function index()
    {
        return response()->json(Agenda::all());
    }

    public function store(Request $request)
    {
        $agenda = Agenda::create($request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]));
        

        return response()->json($agenda, 201);
    }

    public function update(Request $request, $id)
    {
        $agenda = Agenda::findOrFail($id);
        $agenda->update([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
        ]);
        
    
        return response()->json($agenda);
    }
    
    public function destroy($id)
    {
        $agenda = Agenda::findOrFail($id);
        $agenda->delete();
    
        return response()->json(['message' => 'Agenda deleted']);
    }
    

}