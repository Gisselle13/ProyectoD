import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from "xlsx/xlsx";
import * as html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { RegistrosService } from 'src/app/services/registros.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  content = 'Contenido de la página 1';
  tableHTML = '<table><tr><th>Encabezado 1</th><th>Encabezado 2</th></tr><tr><td>Dato 1</td><td>Dato 2</td></tr></table>';


  @ViewChild('tablesContainer') tablesContainer: ElementRef;

  filtro = new Subject<string>();

  forma: FormGroup = this.fb.group({
    fechaInicio: [, Validators.required],
    fechaFinal: [, Validators.required]
  });
  fechaHoy;
  columna = 'fecha';
  reportes: any[] = new Array();
  reportesCentros: any[] = new Array();
  oficios: any[] = new Array();
  canalizacion: any;
  filtros = [];
  order = [];
  total = 0;
  page = 1;
  limit = 10000;
  errMsj = null;
  fechaInicio; fechaFinal;
  documentos: any = []; reporte;
  docs: any[] = new Array();
  imagenActual;
  fullImg = ''; imagenes;
  edad_15_19 = 0; edad_20_24 = 0; edad_25_29 = 0; edad_30_34 = 0; edad_35_44 = 0; edad_45_49 = 0; edad_50_54 = 0; edad_55_59 = 0; edad_60 = 0;
  edad_15_19_l = 0; edad_20_24_l = 0; edad_25_29_l = 0; edad_30_34_l = 0; edad_35_44_l = 0; edad_45_49_l = 0; edad_50_54_l = 0; edad_55_59_l = 0; edad_60_l = 0;
  t_fisica = 0; t_psicologica = 0; t_patrimonial = 0; t_economica = 0; t_sexual = 0; t_obstetrica = 0; t_digital = 0; t_vicaria = 0;
  t_pregunta1 = 0; t_pregunta2 = 0; t_pregunta3 = 0; t_pregunta4 = 0; t_pregunta5 = 0;

  private pageNumber = 1;

  public barChartOptions2: ChartOptions = {
    responsive: true,
  };

  public barChartOptions: ChartOptions = {

    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "black",
          fontSize: 15


        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: "black",
        }
      }]
    },
    legend: {
      position: "right"

    },


    //---Numeros que van dentro de la barra
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        padding: 0,
        anchor: 'center',
        align: 'end',
        color: 'black',
        font: {
          size: 17,
          weight: 'bold',
        },

        //para quitar el cero --> formatter: v => v ? v : ''
      }
    }
  };

  public barChartLabels: Label[];
  public barChartPlugins = [pluginDataLabels];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  //public barChartPlugins = [];
  public barChartData: ChartDataSets[];

  tabDefault = 0; encuesta = 0; Data: any; FechaTermino: any; HoraTermino: any; idregistro: any; Duracion: any[] = new Array();tabSelect:any;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private modalService: NgbModal, private registrosService: RegistrosService ) {
    this.obtenerEncuesta();
  }

  ngOnInit(): void {
    let startDateArry: any[] = [];
    this.fechaInicio = moment(new Date()).format('DD-MM-YYYY');
    this.fechaHoy = moment(new Date()).format('DD-MM-YYYY');
    this.fechaFinal = moment(new Date()).format('YYYY-MM-DD');
    this.forma.patchValue({
      fechaFinal: this.fechaFinal,
      //fechaInicio: this.fechaInicio
    });
    this.obtenerDatos();

    this.barChartLabels = ['Física ', 'Psicológica', 'Patrimonial', 'Económica', 'Sexual', 'Obstétrica', 'Digital', 'Vicaria'];


    this.obtenerCargo();
  }



  obtenerDatos() {

    //--- this.fechaInicio = this.forma.get('fechaInicio').value;
    //---- this.fechaFinal = this.forma.get('fechaFinal').value;

    this.edad_15_19 = 0; this.edad_20_24 = 0; this.edad_25_29 = 0; this.edad_30_34 = 0; this.edad_35_44 = 0; this.edad_45_49 = 0; this.edad_50_54 = 0; this.edad_55_59 = 0; this.edad_60 = 0;
    this.edad_15_19_l = 0; this.edad_20_24_l = 0; this.edad_25_29_l = 0; this.edad_30_34_l = 0; this.edad_35_44_l = 0; this.edad_45_49_l = 0; this.edad_50_54_l = 0; this.edad_55_59_l = 0; this.edad_60_l = 0;
    this.t_fisica = 0; this.t_psicologica = 0; this.t_patrimonial = 0; this.t_economica = 0; this.t_sexual = 0; this.t_obstetrica = 0; this.t_digital = 0; this.t_vicaria = 0;

    this.reportes = [];
    this.reportesCentros = [];

    //Inicializando Valores de las gráficas-----------------------------------------------------------------------------------------------------------------------------------
    this.barChartData = [
      {
        data: [this.t_fisica, this.t_psicologica, this.t_patrimonial, this.t_economica, this.t_sexual, this.t_obstetrica, this.t_digital, this.t_vicaria],
        barPercentage: 0.5, backgroundColor: ['rgba(255, 26, 26, 1)', 'rgba(184, 210, 255, 1)', 'rgba(191, 156, 252, 1)', 'rgba(255, 98, 180, 1', 'rgba(255, 101, 104, 1', 'rgba(255, 154, 101, 1)', 'rgba(255, 208, 101, 1', 'rgba(201, 255, 101, 1)']
      },];

    //Inicializando Valores de las gráficas--------------------------------------------------------------------------------------------------------------------------------
    //console.log('fechaInicio', this.fechaInicio);
    //if(this.fechaInicio == null){this.fechaInicio='';}
    this.registrosService.obtenerDatos(this.fechaInicio, this.fechaFinal)
      .subscribe(
        (data) => {
          console.log('data reportes-', data.registro);
          // this.limit = 5000;
          let t = 0;
          if (data.registro != undefined) {
            this.reportes = data.registro[0];
          //  this.reportesCentros = data.registro[1];
            // console.log('reportes:', this.reportes);
          } else {

          }

          // console.log('total_centrosPsicologia:', this.total_centrosPsicologia);
          for (let r in this.reportes) {
            if (this.reportes[r].pregunta_1=='SI'){this.t_pregunta1++}
            if (this.reportes[r].pregunta_2 == 'SI') { this.t_pregunta2++ }
            if (this.reportes[r].pregunta_3 == 'SI') { this.t_pregunta3++ }
            if (this.reportes[r].pregunta_4 == 'SI') { this.t_pregunta4++ }
            if (this.reportes[r].pregunta_5 == 'SI') { this.t_pregunta5++ }
              this.barChartData = [
                {
                  data: [this.t_pregunta1, this.t_pregunta2, this.t_pregunta3, this.t_pregunta4, this.t_pregunta5],
                  barPercentage: 0.5, backgroundColor: ['rgba(255, 26, 26, 1)', 'rgba(184, 210, 255, 1)', 'rgba(191, 156, 252, 1)', 'rgba(255, 98, 180, 1', 'rgba(255, 101, 104, 1']
                },];
              this.barChartLabels = ['PREGUNTA 1 ', 'PREGUNTA 1 ', 'PREGUNTA 3', 'PREGUNTA 4', 'PREGUNTA 5'];

              // if (parseInt(this.reportes[r].edad) >= 15 && parseInt(this.reportes[r].edad) <= 19) { this.edad_15_19++; }
              // if (parseInt(this.reportes[r].edad) >= 20 && parseInt(this.reportes[r].edad) <= 24) { this.edad_20_24++; }
              // if (parseInt(this.reportes[r].edad) >= 25 && parseInt(this.reportes[r].edad) <= 29) { this.edad_25_29++; }
              // if (parseInt(this.reportes[r].edad) >= 30 && parseInt(this.reportes[r].edad) <= 34) { this.edad_30_34++; }
              // if (parseInt(this.reportes[r].edad) >= 35 && parseInt(this.reportes[r].edad) <= 44) { this.edad_35_44++; }
              // if (parseInt(this.reportes[r].edad) >= 45 && parseInt(this.reportes[r].edad) <= 49) { this.edad_45_49++; }
              // if (parseInt(this.reportes[r].edad) >= 50 && parseInt(this.reportes[r].edad) <= 54) { this.edad_50_54++; }
              // if (parseInt(this.reportes[r].edad) >= 55 && parseInt(this.reportes[r].edad) <= 59) { this.edad_55_59++; }
              // if (parseInt(this.reportes[r].edad) >= 60) { this.edad_60++; }
          }

        }

      );



  }




  listar() {
    this.obtenerDatos();
  }




  exportToExcel1(): void {
    const element = document.getElementById('reporte_excel'); // ID de la tabla HTML
    const worksheet = XLSX.utils.table_to_sheet(element);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    // Guardar el archivo
    XLSX.writeFile(workbook, 'Reporte_' + this.fechaFinal + '.xlsx');
  }




  exportToPDF() {
    const doc = new jsPDF();
    // var content='';
    const tablesContainer = this.tablesContainer.nativeElement;
    // const tablesContainer2 = this.tablesContainer2.nativeElement;
    // const tablesContainer3 = this.tablesContainer3.nativeElement;
    // const tablesContainer4 = this.tablesContainer4.nativeElement;
    const options = { scrollY: -window.scrollY, useCORS: true };
    html2canvas(tablesContainer, options).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      doc.addImage(imgData, 'JPEG', 10, 10 + (this.pageNumber - 1) * 290, 190, 0);


      // doc.addPage();
      // html2canvas(tablesContainer2, options).then(canvas => {
      //   const imgData = canvas.toDataURL('image/jpeg', 1.0);
      //   doc.addImage(imgData, 'JPEG', 10, 10 + (this.pageNumber - 1) * 290, 190, 0);
      //   // doc.save('tablesContainer2' + '.pdf');


      //   doc.addPage();
      //   html2canvas(tablesContainer3, options).then(canvas => {
      //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
      //     doc.addImage(imgData, 'JPEG', 10, 10 + (this.pageNumber - 1) * 290, 190, 0);
      //     // doc.save('Reporte_Actividades_'+this.fechaHoy + '.pdf');


      //     doc.addPage();
      //     html2canvas(tablesContainer4, options).then(canvas => {
      //       const imgData = canvas.toDataURL('image/jpeg', 1.0);
      //       doc.addImage(imgData, 'JPEG', 10, 10 + (this.pageNumber - 1) * 290, 190, 0);
      //       doc.save('Reporte_Actividades_' + this.fechaHoy + '.pdf');
      //     });

      //   });

      // });

      //  doc.save('tablesContainer' + '.pdf');
    });

  }



  tab($event) {
    console.log('$event.index;', $event.index);
   
    if ($event.index==0){
      this.encuesta= 1;
    }
    if ($event.index == 1) {
      this.encuesta = 2;
    }
    // this.inde = $event.index;
    // if (this.inde == 0) {
    //   this.mex_ext = 'EN MÉXICO';
    // }
    // else { this.mex_ext = 'EN EL EXTRANJERO'; }

    // if (this.mex_ext != this.forma.value.mexico_extranjero) {
    //   this.forma.patchValue({
    //     calle: '',
    //     numero_int: '',
    //     numero_ext: '',
    //     localidad: '',
    //     codigo_postal: '',
    //     municipio_estado: '',
    //     entidad_pais: '',
    //   })
    // }

  }

  enviarIdEncuesta() {
    var fecha;
    fecha = this.FechaTermino;
    this.HoraTermino = moment(new Date(fecha)).format('H:mm:ss');
    this.FechaTermino = moment(new Date(fecha)).format('YYYY-MM-DD');

   
   console.log('fecha termino:', this.FechaTermino);
    console.log('HoraTermino:', this.HoraTermino);
    console.log('idregistro:', this.idregistro);
    const text = `Confirmar`;
    Swal.fire({
      title: 'Encuesta: '+ this.encuesta,
      text,
      icon: 'warning',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No',
      toast: true,
      cancelButtonColor: '#EF5350',
      reverseButtons: true
    })
      .then(resp => {
        if (resp.isConfirmed) {
          this.registrosService.EnviarIdencuesta(this.encuesta, this.idregistro)
            .subscribe(resp => {
              Swal.fire({
                position: 'top',
                icon: 'success',
                toast: true,
                title: 'Guardado',
                showConfirmButton: false,
                timer: 1500
              }).then(function () {
            location.reload();
              })
            }, err => {
              Swal.fire({
                title: 'Error',
                text: err.error.mensaje,
                icon: 'error'
              });
            })

        }
      });
  }


  obtenerEncuesta() {
    this.registrosService.obtenerFormato().subscribe(
      data => {
       // console.log('Tipo Formato::::', data);
        this.Data = data
        this.encuesta = this.Data.registro.idencuesta
        this.FechaTermino = this.Data.registro.fecha_inicio;
        this.idregistro = this.Data.registro.idregistro;
        if (this.encuesta == 1) { this.tabDefault = 0; }
        if (this.encuesta == 2) { this.tabDefault = 1; }
        this.tabSelect = this.Data.registro.idencuesta;
        console.log('FechaTermino::::', this.FechaTermino);
        // this.servidor = this.TiposFormato.registro.servidor_inactivo
        console.log('encuesta::::', this.encuesta);
      }
    )
  }


  obtenerCargo() {
    this.registrosService.obtenerCargo()
      .subscribe(
        data => {
          console.log('data---', data);
          this.Duracion = data.respuesta;
         // console.log('Duracion---', this.Duracion);
        },
        err => {
          console.log(err.error);
        }
      )
  }
}
