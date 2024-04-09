import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'modal-imagen',
  templateUrl: './ver-imagen.component.html',
  styleUrls: ['../../../shared/galeria/galeria.css'
  ]
})
export class VerImagenComponent {

  filtro = new Subject<string>(); // esto va al inicio de la clase--
  @Input() fullImg = '';
    constructor(private modalService: NgbModal) {
    }
    closeBtnClick() {
        this.modalService.dismissAll();
      }

}
