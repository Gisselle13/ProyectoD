<?php
use setasign\Fpdi\Fpdi;

require_once APPPATH . "/third_party/fpdf/fpdf.php";
require_once APPPATH . "/third_party/fpdi/src/autoload.php";

require APPPATH . '/third_party/PHPMailer/Exception.php';
require APPPATH . '/third_party/PHPMailer/PHPMailer.php';
require APPPATH . '/third_party/PHPMailer/SMTP.php';


function constancia($post)
{
    $CI = &get_instance();
    $CI->load->database();
  $idplatica = $post['idplatica'];
  //$folio = $post['folio'];


    $where = array('idplatica' => $idplatica);
    $query = $CI->db->get_where('platicas', $where, 1);
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


  $pdf->SetFont('Arial', 'B', 13);
  $pdf->Ln(10);
  $pdf->SetX(13);
  $pdf->Cell(175, 4, utf8_decode('CONSTANCIA PLÁTICA PREMATRIMONIAL'),0,0,'C');
  $pdf->Ln(6);
  $pdf->SetFont('Arial', '', 10);
  $pdf->SetX(13);
  $pdf->MultiCell(190, 5, utf8_decode('En cumplimiento al Decreto LX-1561 P.O.E No. 150, 16-Diciembre del Código Civil del Estado de Tamaulipas.
Art. 85 Fracción VIII.- Constancia de haber recibido plática para evitar la violencia familiar impartidas por el Instituto de la Mujer Tamaulipeca en conjunto con el Instituto Nacional de las Mujeres (INMUJERES).
Hago constar que he recibido una plática sobre violencia intrafamiliar, impartida por personal del Instituto municipal de las mujeres a través de la modalidad web, esto debido a las recomendaciones de las autoridades sanitarias en nuestro municipio para frenar el contagio del COVID 19, de lo anterior manifiesto que para dicho trámite entregue documentación que acreditan mi identidad y he cumplido con este trámite satisfactoriamente.'),0,'J');
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->Ln(6);
      $pdf->SetX(13);
      $pdf->Cell(189, 6, utf8_decode('¿QUE DÍA TE GUSTARÍA TOMAR LA PLÁTICA PREMATRIMONIAL? '), 1,0,'C');
      $pdf->Ln(6);
      $pdf->SetFont('Arial', '', 10);
      if($codigo->dia_1==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('LUNES 1:00 P.M. (PRESENCIAL)'), 1); $pdf->Ln(6); }
      if($codigo->dia_2==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('LUNES 3:00 P.M. (PRESENCIAL)'), 1); $pdf->Ln(6); }
      if($codigo->dia_3==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('MIÉRCOLES 1:00 P.M. (PRESENCIAL)'), 1); $pdf->Ln(6); }
      if($codigo->dia_4==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('MIÉRCOLES 3:00 P.M. (PRESENCIAL)'), 1); $pdf->Ln(6); }
      if($codigo->dia_5==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('VIERNES 1:00 P.M. (PRESENCIAL)'), 1); $pdf->Ln(6); }
      if($codigo->dia_6==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('VIERNES 3:00 P.M. (PRESENCIAL)'), 1); $pdf->Ln(6); }
      if($codigo->dia_7==1){ $pdf->SetX(13); $pdf->Cell(189,6, utf8_decode('VIERNES 6:00 P.M. MODALIDAD VIRTUAL (ZOOM)'),1); $pdf->Ln(6); }

     // $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(189, 6, utf8_decode('FECHA DE LA PLÁTICA PREMATRIMONIAL'),1, 0, 'C');
      $pdf->Ln(6);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(13);
      $pdf->Cell(189, 6, utf8_decode($codigo->fecha),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(189, 6, utf8_decode('¿EN QUÉ OFISCALÍA REALIZARON EL TRAMITE?'),1, 0, 'C');
      $pdf->Ln(6);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(13);
      $cadena = $codigo->oficialia;
      $resultado = str_replace(["‟", "”"], "\"", $cadena);
      $pdf->Cell(189, 6, utf8_decode($resultado),1);


      $pdf->Ln(9);
      $pdf->SetFont('Arial', 'B', 11);
      $pdf->SetX(13);
      $pdf->Cell(175, 4, utf8_decode('DATOS PERSONALES CONTRIBUYENTE 1'),0,0,'C');
      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(19, 6, utf8_decode('NOMBRE:'),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(32);
      $pdf->Cell(170, 6, utf8_decode($codigo->nombre),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(19, 6, utf8_decode('EDAD: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(32);
      $pdf->Cell(170, 6, utf8_decode($codigo->edad),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(35, 6, utf8_decode('CALLE Y NÚMERO: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(48);
      $pdf->Cell(154, 6, utf8_decode($codigo->calle_num),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(35, 6, utf8_decode('COLONIA: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(48);
      $pdf->Cell(154, 6, utf8_decode($codigo->colonia),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(35, 6, utf8_decode('TELÉFONO: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(48);
      $pdf->Cell(154, 6,  preg_replace('/^(\d{3})(\d{3})(\d{4})$/', '($1) $2 $3', $codigo->telefono), 1, 1, 'L');
      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(56, 6, utf8_decode('ÚLTIMO GRADO DE ESTUDIOS: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(69);
      $pdf->Cell(133, 6, utf8_decode($codigo->estudios),1);


      $pdf->Ln(9);
      $pdf->SetFont('Arial', 'B', 11);
      $pdf->SetX(13);
      $pdf->Cell(175, 4, utf8_decode('DATOS PERSONALES CONTRIBUYENTE 2'),0,0,'C');
      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(19, 6, utf8_decode('NOMBRE:'),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(32);
      $pdf->Cell(170, 6, utf8_decode($codigo->nombre_2),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(19, 6, utf8_decode('EDAD: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(32);
      $pdf->Cell(170, 6, utf8_decode($codigo->edad_2),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(35, 6, utf8_decode('CALLE Y NÚMERO: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(48);
      $pdf->Cell(154, 6, utf8_decode($codigo->calle_num_2),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(35, 6, utf8_decode('COLONIA: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(48);
      $pdf->Cell(154, 6, utf8_decode($codigo->colonia_2),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(35, 6, utf8_decode('TELÉFONO: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(48);
      $pdf->Cell(154, 6,  preg_replace('/^(\d{3})(\d{3})(\d{4})$/', '($1) $2 $3', $codigo->telefono_2), 1, 1, 'L');

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(56, 6, utf8_decode('ÚLTIMO GRADO DE ESTUDIOS: '),1);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(69);
      $pdf->Cell(133, 6, utf8_decode($codigo->estudios_2),1);


      $pdf->Ln(12);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(76, 6, utf8_decode('¿VIVEN ACTUALMENTE EN ÚNION LIBRE?'),1);
      //$pdf->Ln(6);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(89);
      $pdf->Cell(113, 6, utf8_decode($codigo->union_libre),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(76, 6, utf8_decode('¿TIENEN HIJAS O HIJOS EN COMÚN?'),1);
      //$pdf->Ln(6);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(89);
      $pdf->Cell(113, 6, utf8_decode($codigo->hijos),1);

      $pdf->Ln(6);
      $pdf->SetFont('Arial', 'B', 10);
      $pdf->SetX(13);
      $pdf->Cell(100, 6, utf8_decode('¿TIENEN HIJAS O HIJOS ANTERIORES A LA RELACIÓN?'),1);
     // $pdf->Ln(6);
      $pdf->SetFont('Arial', '', 10);
      $pdf->SetX(113);
      $pdf->Cell(89, 6, utf8_decode($codigo->hijos_ant),1);


      $pdf->Ln(9);
      $pdf->SetFont('Arial', '', 9);
      $pdf->SetX(13);
      $pdf->MultiCell(190, 4, utf8_decode('Como parte de los requisitos que solicitamos para poder expedir las constancias a las parejas solicitantes, les pedimos de la manea más atenta traer copia de credencia de elector de ambos contrayentes.'));

      // $pdf->Ln(15);
      // $pdf->SetX(20);

// $cadena =$codigo->redaccion;
//   $resultado = str_replace(["“","”"], "\"", $cadena);
//   $pdf->MultiCell(175, 6, '               '.utf8_decode($resultado),0,'J' );

  
  // $pdf->SetY(220);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, '____________________________________', 0, 0, 'C');
  // $pdf->SetFont('Arial', 'B', 10);
  // $pdf->Ln(6);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, utf8_decode('LIC. GABRIELA CRUZ GUAJARDO'),0,0,'C');
  // $pdf->SetFont('Arial', '', 10);
  // $pdf->Ln(6);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, utf8_decode('COORDINACIÓN DE ATENCIÓN A MUJERES EN'), 0, 0, 'C');
  // $pdf->Ln(6);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, utf8_decode('SITUACIÓN DE VIOLENCIA'), 0, 0, 'C');
  // $pdf->Ln(6);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, utf8_decode('INSTITUTO MUNICIPAL DE LA MUJER'), 0, 0, 'C');
  // $pdf->Ln(6);
  // $pdf->SetX(13);
  // $pdf->Cell(184, 4, utf8_decode('DE NUEVO LAREDO'), 0, 0, 'C');
  // $pdf->SetFont('Arial', '', 8);
 


    return $pdf->Output("ejemplo.pdf", 'I', false);
}

