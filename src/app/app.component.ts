import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppGlobals } from './model/app-globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isUserLoggedIn: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(private appGlobals: AppGlobals) {
    this.subscriptions.add(
      this.appGlobals.dispatchedJwtToken.subscribe(value => {
        if (value) {
          this.appGlobals.setUserLoggedIn(true);
          this.isUserLoggedIn = true;
        } else {
          this.appGlobals.setUserLoggedIn(false);
          this.isUserLoggedIn = false;
        }
      }),
    );
  }
}
