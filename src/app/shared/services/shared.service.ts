import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  myGlobalVar;

  constructor() {
    this.myGlobalVar = 0;
   // alert("My intial global variable value is: " + this.myGlobalVar);
   }

  // setMyGV(val: number) {
  //   AddEditComponent.a3 = val;
  //   this.myGlobalVar = val;
  //   alert("My global variable  is: " + this.myGlobalVar);
  // }

  // getMyGV(val: number) {
  //   return this.myGlobalVar;
  // }
}
