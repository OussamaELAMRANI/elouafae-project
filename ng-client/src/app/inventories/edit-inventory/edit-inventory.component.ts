import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'app/inventories/inventory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dar-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent implements OnInit {

  editInv: FormGroup
  idRoute = 'Salaam'
  next: boolean[] = [true, false, false]
  nx = true
  constructor(private sInventory: InventoryService,
    private route: ActivatedRoute,
    private fBuilder: FormBuilder) { }

  ngOnInit() {
    this.sInventory.getDetails(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.editInv.patchValue({
          design: data.design,
          source: 'autre',
          oldSource: 'Bad Room',
          cadage: data.codage,
          otherPlace: 'otherPlace',
          vInitial: data.initialValue,
          vActuel: data.actualValue,
          nbrLife: [6],
          myDate: [''] //data.enteredAt
        })
        console.log(data)
      })


    this.editInv = this.fBuilder.group({
      design: ['data.design', [Validators.required]],
      source: ['autre', [Validators.required]],
      oldSource: ['Bad Room'],
      cadage: ['data.codage', [Validators.required]],
      otherPlace: ['otherPlace', [Validators.required]],
      vInitial: [111, [Validators.required]],
      vActuel: [11, [Validators.required]],
      nbrLife: [6],
      myDate: [''], //data.enteredAt
      nPerte: '',
      perteDate: '',
      justif: '',
    })
  }
  save() {
  }

  nextStep(step) {
    if (step >= 0)
      this.next[step - 1] = false
    if (step <= 3)
      this.next[step + 1] = false

    this.next[step] = true
  }
}
