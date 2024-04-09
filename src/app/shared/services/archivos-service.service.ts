import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
//import { ConvocatoriasService } from 'src/app/services/convocatorias.service';

@Injectable()
export class ArchivosService
{
  constructor
  (
    private _alertasService: AlertasService,
   //private _convocatoriasService: ConvocatoriasService
  ){ }

  abrirActual(idConvocatoria, _servicio)
  {
    _servicio.abrirArchivo(idConvocatoria).subscribe( () => {} )
  }
  
  abrirLocal(archivo)
  {
    if(archivo == null)
    {
      this._alertasService.mostrarMensajeToast('Aviso', 'No se ha seleccionado ningún archivo', 'warning')
      return;
    }
    
    // Convirtiendo el archivo a BLOB
    let archivoBlob = new Blob([archivo], { type: 'application/pdf' });
    let fileURL = URL.createObjectURL(archivoBlob);

    // Abriendo el archivo en una pestaña nueva
    window.open(fileURL);
  }
}