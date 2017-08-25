import { Injectable } from '@angular/core';

declare let calendarUi:any
@Injectable()
export class CalendarUiService {

  constructor() { }

  show() {
    calendarUi()
  }

}
