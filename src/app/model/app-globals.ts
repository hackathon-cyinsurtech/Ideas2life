import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppGlobals {
  dispatchedJwtToken: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentPrediction: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setDispatchedJwtToken(value: boolean) {
    this.dispatchedJwtToken.next(value);
  }

  setUserLoggedIn(value) {
    this.userLoggedIn.next(value);
  }

  setCurrentPrediction(value) {
    this.currentPrediction.next(value);
  }
}