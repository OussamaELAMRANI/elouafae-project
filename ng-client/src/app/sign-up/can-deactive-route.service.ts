import { Observable } from 'rxjs/Observable';
import { SignUpComponent } from './sign-up.component';
import { RouterStateSnapshot, CanDeactivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CanDeactiveRouteService implements CanDeactivate<SignUpComponent> {

  canDeactivate(component: SignUpComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> {
    if (component.isDirty) {
      return window.confirm('voullez-vous vraiment quitter ??')
    }
    return true
  }


  constructor() { }


}
