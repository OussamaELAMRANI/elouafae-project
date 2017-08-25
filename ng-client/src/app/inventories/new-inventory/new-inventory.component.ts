import { ToastrService } from './../../commun/toastr.service';
import { InventoryService } from 'app/inventories/inventory.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SemanticUiService } from './../../commun/semantic-ui.service';
import { Component, OnInit } from '@angular/core';

import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';
import { IMyDpOptions } from "mydatepicker";

const URL = 'http://localhost:3000/upload';


@Component({
  selector: 'dar-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.scss'],
  // directives: []
})
export class NewInventoryComponent implements OnInit {

  public uploader: FileUploader
  newInvGroup: FormGroup
  autreSource = false
  autrePlace: any[] = [false]
  srcs: any[]
  places: any[]

  constructor(private semantic: SemanticUiService,
    private fBuilder: FormBuilder,
    private sIneventory: InventoryService,
    private sToast:ToastrService) { }

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    dayLabels: { su: 'Dim', mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam' },
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Aôu', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
    todayBtnTxt: 'Aujourd\'hui'
  };

  ngOnInit() {
    this.uploader = new FileUploader({ url: URL });
    this.newInvGroup = this.fBuilder.group({
      design: ['', [Validators.required]],
      source: ['', [Validators.required]],
      autreSource: [''],
      codage: ['', [Validators.required]],
      vInitial: ['', [Validators.required]],
      vActuel: ['', [Validators.required]],
      lifeTime: [''],
      enterDate: [''],
      exitDate: [''],
      invs: this.fBuilder.array([this.invArray()])
    })
    // this.semantic.calenderUi()
    this.newInvGroup.get('source').valueChanges.subscribe(val => {
      if (val === 'autre') {
        this.autreSource = true
      }
      else {
        this.autreSource = false
      }
    })
    this.newInvGroup.get('lifeTime').valueChanges.subscribe(val => {

      if (this.newInvGroup.get('enterDate').value !== '') {
        let ans: any = this.newInvGroup.get('enterDate').value.date.year + val
        this.setDate(ans)
      }

    })
    this.inventories.valueChanges.subscribe(val => {
      //  console.log(val.length)
      for (let i = 0; i < val.length; i++) {
        if (val[i].affecterAu === 'autre') {
          this.autrePlace[i] = true
        }
        else {
          this.autrePlace[i] = false
        }
      }
    })

    this.injcSource()
    this.injcPlace()
  }

  setDate(ans): void {
    // Set today date using the patchValue function
    let mois: any = this.newInvGroup.get('enterDate').value.date.month
    let jour: any = this.newInvGroup.get('enterDate').value.date.day
    this.newInvGroup.patchValue({
      exitDate: {
        date: {
          year: ans,
          month: mois,
          day: jour
        }
      }
    });
  }

  invArray(): FormGroup {
    return this.fBuilder.group({
      nInventory: ['', [Validators.required]],
      nInvfinal: ['', [Validators.required]],
      affecterAu: ['', [Validators.required]],
      autrePlaces: [''],
    })
  }
  //Get All Inventories
  get inventories(): FormArray {
    return <FormArray>this.newInvGroup.get('invs')
  }

  addInv(): void {
    this.inventories.push(this.invArray())
  }

  save() {
    let source = this.getSource()
    let dExit = this.getExitDate()
    let details: any[] = []

    for (let i = 0; i < this.inventories.length; i++) {
      let place = ''
      let nInv = this.inventories.at(i).value.nInventory;
      let aff = this.inventories.at(i).value.affecterAu;
      let autreP = this.inventories.at(i).value.autrePlaces;

      if (aff === 'autre') {
        this.addPlace(autreP)
        place = autreP
      }
      else {
        place = aff
      }

      for (let j = 0; j < this.inventories.at(i).value.nInvfinal; j++) {

        let newArt: any = {
          nInventory: nInv + j,
          affected: place,
          lossNumber: 0,
          lossDate: '',
          justification: 'n/a'
        }
        details.push(newArt)
      }
      // console.log(JSON.stringify(this.inventories.at(i).value))
      // console.log(art)
    }

    let newInv: any = {
      design: this.newInvGroup.get('design').value,
      source: source,
      codage: this.newInvGroup.get('codage').value,
      initialValue: this.newInvGroup.get('vInitial').value,
      actualValue: this.newInvGroup.get('vActuel').value,
      lifeTime: this.newInvGroup.get('lifeTime').value,
      enteredAt: this.newInvGroup.get('enterDate').value.jsdate,
      exitAt: dExit,
      details: details
    }

    this.sIneventory.saveNewInventory(newInv).subscribe(data => {
      this.sToast.success(data.msg, 'Bravo !')
      console.log(data)
    })

    // console.log(dExit)

  }
  getExitDate() {
    let y = this.newInvGroup.get('exitDate').value.date.year
    let m = this.newInvGroup.get('exitDate').value.date.month
    let d = this.newInvGroup.get('exitDate').value.date.day
    return new Date(y, m, d);
  }

  getSource() {
    if (this.newInvGroup.get('source').value === 'autre') {
      let otherS = this.newInvGroup.get('autreSource').value
      this.addSource(otherS)
      return otherS
    }
    return this.newInvGroup.get('source').value
  }

  getPlace() {

  }

  addSource(newSource) {
    let newS: any = {
      source: newSource
    }
    this.sIneventory.saveOtherSource(newS).subscribe(data => {
      // this.message = data
      console.log('+++++++ New Source :' + data)
    })
  }
  addPlace(newPlace) {
    let newP: any = {
      place: newPlace
    }
    this.sIneventory.saveOtherPlace(newP).subscribe(data => {
      // this.message = data
      console.log('+++++++ New Place :' + data)
    })
  }
  injcSource() {
    this.sIneventory.getSrc().subscribe(src => {
      this.srcs = src
      // console.log('Call inj Src +++---' + JSON.stringify(src))
      // console.log('Call inj Src +++' +  this.srcs)
    })
  }

  injcPlace() {
    this.sIneventory.getPlaces().subscribe(p => {
      this.places = p
      // console.log('Call inj Src +++---' + JSON.stringify(src))
      // console.log('Call inj Src +++' +  this.srcs)
    })
  }

  // public hasBaseDropZoneOver: boolean = false;
  // public hasAnotherDropZoneOver: boolean = false;

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }
  removeInv() {
    this.inventories.removeAt(this.inventories.length - 1)
  }
  restInv() {
    this.inventories.reset(['nInventory'])
  }
}
