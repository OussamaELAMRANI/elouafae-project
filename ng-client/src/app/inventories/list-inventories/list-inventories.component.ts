import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'app/inventories/inventory.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dar-list-inventories',
  templateUrl: './list-inventories.component.html',
  styleUrls: ['./list-inventories.component.scss']
})
export class ListInventoriesComponent implements OnInit {

  detailGroup: FormGroup
  inv: any
  list: boolean = true
  constructor(private sInventory: InventoryService,
    private route: ActivatedRoute,
    private fBuilder: FormBuilder) { }

  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dayLabels: { su: 'Dim', mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam' },
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Aôu', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
    todayBtnTxt: 'Aujourd\'hui'
  };
  ngOnInit() {
    this.sInventory.getDetails(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.inv = data
        console.log(data)
      })

    this.detailGroup = this.fBuilder.group({
      nInventory: ['', [Validators.required]],
      affecterAu: ['', [Validators.required]],
      autrePlaces: [''],
      nPerte: ['', [Validators.required]],
      perteDate: ['', [Validators.required]],
      justif: ['', [Validators.required]],
    })

  }

  addDetail(list): void {
    if (list !== 0)
      this.list = true
    else
      this.list = false
  }
}
