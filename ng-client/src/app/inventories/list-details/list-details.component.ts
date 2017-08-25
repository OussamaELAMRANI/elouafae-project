import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dar-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  @Input() inv:any[]

  constructor() { }

  ngOnInit() {
  }

}
