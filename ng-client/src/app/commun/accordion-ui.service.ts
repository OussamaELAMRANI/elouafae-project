import { Injectable } from '@angular/core';

declare let accordionUi
@Injectable()
export class AccordionUiService {

  constructor() { }

  show(){
    accordionUi()
  }
}
