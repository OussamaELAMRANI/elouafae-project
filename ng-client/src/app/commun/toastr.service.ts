import { Injectable } from '@angular/core';

declare const toastr:any

@Injectable()
export class ToastrService {

  constructor() { }

  success(msg: String, title?:String ){
    toastr.success(msg, title)
  }

  warrning(msg: String, title?:String ){
    toastr.warrning(msg, title)
  }
  error(msg: String, title?:String ){
    toastr.error(msg, title)
  }

}
