<?php

function correo($correo)
{
    $CI = &get_instance();
    $CI->load->database();
    require APPPATH . '/third_party/PHPMailer/Exception.php';
    require APPPATH . '/third_party/PHPMailer/PHPMailer.php';
    require APPPATH . '/third_party/PHPMailer/SMTP.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true); // Passing `true` enables exceptions
    try {
      //  $pass =  $correo['password2'];
        $folio = $correo['folio'];
        $correo = $correo['correo'];
        //$curso = $datos->curso;
        include 'plantilla_correo.php';
        //Server settings
        // $mail->SMTPDebug = 2; // Enable verbose debug output
       // $mail->SMTPDebug = 2;
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'inmujer.mx'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'sistemainmujer@inmujer.mx';
        $mail->Password = '_lZGW2@H*I3V'; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to

        //Recipients
        $mail->setFrom('sistemainmujer@inmujer.mx', utf8_decode('Sistema de Inmujer '));
        $mail->addAddress($correo); // Add a recipient

        //Content        
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = utf8_decode('NOTIFICACIÓN OFICIO')  ;
        $plantilla = utf8_decode($plantilla);
        $mail->AllowEmpty = true;
        $mail->addEmbeddedImage('./assets/logo.png', 'logo', 'logo.png');
        $mail->Body = utf8_decode('
        <img alt="Logo" src="cid:logo">
        <h2 align="center"> SISTEMA DE INMUJER </h2> <br> 
        <h3 align="center" style="color: gray;"> OFICIO DE CANALIZACIÓN LISTO PARA IMPRIMIR <br> Folio:' . $folio .' </h3> <br> <hr><br> ');
        $mail->AltBody = '';

        $mail->send();
        // echo 'Message has been sent';
    } catch (Exception $e) {
        //$error = error_get_last();
       // echo "Error al enviar el correo electrónico: " . $error['message'];

        $error = $mail->ErrorInfo;
        echo "Error al enviar el correo electrónico: " . $error;
       // echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }

}
