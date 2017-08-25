import { FormBuilder, FormGroup } from '@angular/forms';
import { SemanticUiService } from './../commun/semantic-ui.service';
import { SweetAlertService } from './../commun/sweet-alert.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { InventoryService } from "app/inventories/inventory.service";
// import { CalendarUiService } from "app/commun/calendar-ui.service";
// import { AccordionUiService } from "app/commun/accordion-ui.service";

@Component({
  selector: 'dar-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss']
})
export class InventoriesComponent implements OnInit {

  searchGroup: FormGroup

  invs: any
  vInvs: any
  fDesign: String
  details: any
  filtering: boolean = false

  constructor(
    private sInventory: InventoryService,
    private fBuilder: FormBuilder,
    private swal: SweetAlertService,
    private semantic: SemanticUiService) { }

  ngOnChanges() {
    // console.log('On Change methode') just a hook Cycle
  }
  // Animation Filter Bar
  getFilterBar() {
    this.filtering = !this.filtering
  }
  getRight() {
    if (this.filtering == true)
      return 0
    else
      return -240
  }

  ngOnInit() {
    this.sInventory.getInventories()
      .subscribe(data => {
        this.invs = data
        this.filterByDesign('')
      })
    //initial the forms
    this.searchGroup = this.fBuilder.group({
      design: '',
      zone: ''
    })
    //  Change value
    this.searchGroup.get('design').valueChanges.subscribe(val => {
      this.filterByDesign(val)
    })

    this.semantic.accordionUi().calenderUi().multiSelect().checkboxUi()
  }

  filterByDesign(fDesign: String) {
    if (fDesign == '') {
      this.vInvs = this.invs
    }
    else {
      console.log('Call fDesign === FILTER ')
      this.vInvs = this.invs.filter(fInv => {
        let reg = new RegExp("^.*" + fDesign + ".*", "gi");
        // TODO: console.log(reg) Calling this function A number of each element
        return (fInv.design.search(reg) !== -1)
      })
    }
  }

  getDetail(invId) { //clicked event
    this.details = null
    console.log(invId)
    this.sInventory.getDetails(invId)
      .subscribe(data => {
        console.log(data)
        this.details = data.details
      })
  }

  saySalam() {
    let cc = this.swal.confirm('Salaam I wanna just say you Peace :D')
    console.log(cc)

  }
}
