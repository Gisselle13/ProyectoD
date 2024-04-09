import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(private httpClient: HttpClient) { }

//Metodo para evitar saltos de linea en el textarea
  metaKeyUp(event) {
    var exampleKey = 13;
    var key = event.keyCode || event.which;
    if (key == exampleKey) {
    //  console.log('Enter');
      return false;
    }
   // console.log('evewich-', event.which)
  }



  
}
