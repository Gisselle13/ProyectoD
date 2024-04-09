<?php
use setasign\Fpdi\Fpdi;

require_once APPPATH . "/third_party/fpdf/fpdf.php";
require_once APPPATH . "/third_party/fpdi/src/autoload.php";

require APPPATH . '/third_party/PHPMailer/Exception.php';
require APPPATH . '/third_party/PHPMailer/PHPMailer.php';
require APPPATH . '/third_party/PHPMailer/SMTP.php';


function oficio_can($post)
{
    $CI = &get_instance();
    $CI->load->database();
  $idoficio = $post['idoficio'];
  $folio = $post['folio'];


    $where = array('idoficio' => $idoficio);
    $query = $CI->db->get_where('view_oficios', $where, 1);
    $codigo = $query->row();
 
  // if ($folio == 1) {
  //   $where = array('idoficio' => $idoficio);
  //   $query = $CI->db->get_where('agenda_legal', $where, 1);
  //   $codigo = $query->row();
  //   $folio = 'LEGAL';
  // }
    



    $pdf = new Fpdi('L', 'mm', 'letter');
    $pdf->setSourceFile('plantillas/oficio_canalizacion.pdf');

    $pdf->SetFont('Arial');
    $pdf->SetTextColor(010, 010, 010);
    $pdf->SetXY(30, 30);
    $pdf->SetFontSize(8);
    $pdf->AddPage();
    
    $tplIdx = $pdf->importPage(1);
    $pdf->useTemplate($tplIdx, 0, 0,null,null,true);

    //         //Documento PDF
    ////////////////////////////////////////1. DATOS GENERALES////////////////////////////////////////////////////////////////
    $pdf->SetTitle('Documento PDF');
    $pdf->SetFont('Arial', 'B', 8);
    $pdf->SetX(13);
    $pdf->SetFillColor(135, 214, 161);
    $pdf->SetTextColor(000, 000, 000);
  //--   $logo = SERVIDOR . APP . 'application/images/check3.png';

  //Inicial
  // if($codigo->tipo_formato==1){
  // $pdf->Image($logo, 139.6, 38.8, 3.2, 3.2);
  // }


    // $pdf->SetLineWidth(0.5);
     $pdf->SetY(20);
     $pdf->SetFont('Arial', '', 10);
     $pdf->SetX(90);
     $pdf->Cell(50, 6, utf8_decode('DEPENDENCIA: '), 1, 0, 'R');
     $pdf->Cell(60, 6, utf8_decode($codigo->nombre), 1, 0, 'L');
     $pdf->Ln(6);
     $pdf->SetX(90);
     $pdf->Cell(50, 6, utf8_decode('FOLIO: '), 1, 0, 'R');
     $pdf->Cell(60, 6, utf8_decode($folio),1,0,'L');
     $pdf->Ln(6);
     $pdf->SetX(90);
     $pdf->Cell(50, 6, utf8_decode('FECHA: '), 1, 0, 'R');
     $pdf->Cell(60, 6, utf8_decode($codigo->fecha),1,0,'L');
     $pdf->Ln(6);
     $pdf->SetX(90);
     $pdf->Cell(50, 6, utf8_decode('ASUNTO: '), 1, 0, 'R');
     $pdf->Cell(60, 6, utf8_decode($codigo->asunto), 1, 0, 'L');


     $pdf->SetFont('Arial', 'B', 10);
     $pdf->Ln(10);
     $pdf->SetX(13);
     $pdf->Cell(60, 4, utf8_decode($codigo->dirigido));
     $pdf->Ln(6);
     $pdf->SetX(13);
     $pdf->Cell(60, 4, utf8_decode('(INSTITUCIÓN) '));
     $pdf->Ln(6);
     $pdf->SetX(13);
     $pdf->Cell(60, 4, utf8_decode('NUEVO LAREDO, TAMAULIPAS '));
     $pdf->Ln(6);
     $pdf->SetX(13);
     $pdf->Cell(60, 4, utf8_decode('P R E S E N T E.-'));

     $pdf->SetFont('Arial', '', 10);
     $pdf->Ln(15);
     $pdf->SetX(20);

  $cadena =$codigo->redaccion;
  $resultado = str_replace(["“","”"], "\"", $cadena);
  $pdf->MultiCell(175, 6, '               '.utf8_decode($resultado),0,'J' );

  
  $pdf->SetY(220);
  $pdf->SetX(13);
  $pdf->Cell(184, 4, '____________________________________', 0, 0, 'C');
  $pdf->SetFont('Arial', 'B', 10);
  $pdf->Ln(6);
  $pdf->SetX(13);
  $pdf->Cell(184, 4, utf8_decode('LIC. GABRIELA CRUZ GUAJARDO'),0,0,'C');
  $pdf->SetFont('Arial', '', 10);
  $pdf->Ln(6);
  $pdf->SetX(13);
  $pdf->Cell(184, 4, utf8_decode('COORDINACIÓN DE ATENCIÓN A MUJERES EN'), 0, 0, 'C');
  $pdf->Ln(6);
  $pdf->SetX(13);
  $pdf->Cell(184, 4, utf8_decode('SITUACIÓN DE VIOLENCIA'), 0, 0, 'C');
  $pdf->Ln(6);
  $pdf->SetX(13);
  $pdf->Cell(184, 4, utf8_decode('INSTITUTO MUNICIPAL DE LA MUJER'), 0, 0, 'C');
  $pdf->Ln(6);
  $pdf->SetX(13);
  $pdf->Cell(184, 4, utf8_decode('DE NUEVO LAREDO'), 0, 0, 'C');
  $pdf->SetFont('Arial', '', 8);
  // $pdf->SetY(255);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, utf8_decode('C.C.P. Archivo'), 0, 0, '');
    // $pdf->Ln(7.5);
    // $pdf->SetX(135);
    // $pdf->Cell(70, 4, utf8_decode($codigo->curp));
    // $pdf->Ln(1);
    // $pdf->SetX(13);
  

  // if ($view_nivel != null) {
  // $pdf->Cell(70, 4, utf8_decode('IDUSUARIO----'. $view_nivel->idusuario));
  // $pdf->Cell(70, 4, utf8_decode('NIVEL----' . $view_nivel->nivel));
  // }



    return $pdf->Output("ejemplo.pdf", 'I', false);
}

