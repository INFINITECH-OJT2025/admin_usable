<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SentEmail;
use App\Mail\SendMail;

class MailController extends Controller
{
    public function getSentEmails()
    {
        $emails = SentEmail::orderBy('created_at', 'desc')->get();
        return response()->json($emails);
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
            'to' => 'required|array|min:1', 
            'to.*' => 'email', 
            'cc' => 'nullable|array', // Validate CC as an optional array
            'cc.*' => 'email', // Validate each CC email
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
        ]);
    
        $to = $request->to;
        $cc = $request->cc ?? []; // Get CC emails, default to empty array if not provided
        $subject = $request->subject;
        $body = $request->body;
    
        // Send email using PHPMailer
        $mailSent = SendMail::send($to, $cc, $subject, $body); // Pass CC emails to SendMail
    
        if ($mailSent) {
            // Save to database
            SentEmail::create([
                'to' => json_encode($to),
                'cc' => json_encode($cc), // Store CC emails
                'subject' => $subject,
                'body' => $body,
            ]);
    
            return response()->json(['message' => 'Email sent successfully!']);
        } else {
            return response()->json(['message' => 'Failed to send email.'], 500);
        }
    }
}
