import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Este servicio sirve para pasar información entre distintos componentes
export class CommunicationService {
  // Mensaje que queremos enviar. por defecto: 'undefined'
  private message: string = 'undefined';

  // Contexto en el cual queremos pasar el mensaje por ejemplo: 'login'. Por defecto 'undefined'
  private context: string = 'undefined';

  constructor() { }

  // Getters y Setters
  set setMessage(message)
  {
    this.message = message;
  }

  get getMessage()
  {
    return this.message;
  }

  set setContext(context)
  {
    this.context = context;
  }

  get getContext()
  {
    return this.context;
  }  
}
