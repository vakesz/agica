<?php
    $to      = 'gabor.pinkova@gmail.com';
    $subject = 'the subject';
    $message = 'hello';
    $headers = 'From: noreply@agiica.com'       . "\r\n" .
                 'Reply-To: noreply@agiica.com' . "\r\n" .
                 'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
?>