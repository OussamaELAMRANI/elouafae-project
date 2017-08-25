import { Injectable } from '@angular/core';

declare let swal: any

@Injectable()
export class SweetAlertService {

  constructor() { }

  info(title: String, msg: String) {
    swal(title, msg)
  }

  confirm(msg: String) {
    return swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
       (isConfirm) => {
        if(isConfirm){
          return 'Hello'
        }
        return false
      });
  }

}
