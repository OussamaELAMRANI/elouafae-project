import { Injectable } from '@angular/core';

declare let semanticUi

@Injectable()
export class SemanticUiService {

  constructor() { }

  accordionUi() {
    semanticUi().accordionUi()
    return this
  }

  calenderUi() {
    semanticUi().calenderUi()
    return this
  }
  multiSelect() {
    semanticUi().multiSelect()
    return this
  }
  checkboxUi() {
    semanticUi().checkboxUi()
    return this
  }

  getShortDate(){
    semanticUi().getShortDate()

  }

}
