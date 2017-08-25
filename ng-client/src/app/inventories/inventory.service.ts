import { Response, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
// import "rxjs/add/operator/do";


@Injectable()
export class InventoryService {
  private basePath = "inventory"

  constructor(private http: Http) { }

  getInventories() {
    return this.http.get(this.basePath)
      .map(this.extractData)
      // .do(data => console.log('(DO/CATCH) get users: ' + JSON.stringify(data)));
    // .catch(this.errorHandler);
  }

  getSrc(){
    return this.http.get(this.basePath+'/sources')
      .map(this.extractData)
  }
  getPlaces(){
    return this.http.get(this.basePath+'/places')
      .map(this.extractData)
  }

  getDetails(invId) {
    let url = `${this.basePath}/${invId}/details`
    console.log(url)
    return this.http.get(url).map(this.extractData)
  }

  saveNewInventory(newInv) {
    let url = `${this.basePath}/new`
    console.log(url);
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    // console.log(JSON.stringify(this.signUpGroup.value))
    return this.http.post(url, newInv, { headers: header })
      .map(this.extractData)
  }

  saveOtherPlace(otherPlace) {
    let url = `${this.basePath}/new-place`
    console.log(url);
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    // console.log(JSON.stringify(this.signUpGroup.value))
    return this.http.post(url, otherPlace, { headers: header })
      .map(this.extractData)
  }

  saveOtherSource(otherSource) {
    let url = `${this.basePath}/new-source`
    console.log(url);
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    // console.log(JSON.stringify(this.signUpGroup.value))
    return this.http.post(url, otherSource, { headers: header })
      .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body || {}
  }


}
