<?php

namespace App\Mail;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class SendMail
{
    public static function send($to, $cc, $subject, $body)
    {
        require base_path('vendor/autoload.php'); // Ensure autoload is included
    
        $mail = new PHPMailer(true);
    
        try {
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host       = env('MAIL_HOST', 'smtp.gmail.com');
            $mail->SMTPAuth   = true;
            $mail->Username   = env('MAIL_USERNAME'); 
            $mail->Password   = env('MAIL_PASSWORD'); 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = env('MAIL_PORT', 587);
    
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    
            // Add multiple recipients
            foreach ($to as $recipient) {
                $mail->addAddress($recipient);
            }
    
            // Add CC recipients
            foreach ($cc as $ccRecipient) {
                $mail->addCC($ccRecipient);
            }
    
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $body;
    
            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
