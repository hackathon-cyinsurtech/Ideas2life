import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../model/app-settings';
import { LocalStorageService } from 'ngx-webstorage';
import { AppGlobals } from '../../model/app-globals';
import { Router } from '@angular/router';

export const mockRestaurantCategories = ['Pizza', 'Souvlaki', 'Chinese', 'Burgers', 'Coffees'];
export const averagePricePerPersonRanges = ['Less than 7 euro', 'From 7 euro to 12 euro', 'Greater than 12 euro'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  mockRestaurantCategories = mockRestaurantCategories;
  averagePricePerPersonRanges = averagePricePerPersonRanges;
  restaurantInformationForm: FormGroup;
  currentDeliveryTimes: any;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private localStorage: LocalStorageService,
              private appGlobals: AppGlobals,
              private router: Router) {
    this.restaurantInformationForm = this.formBuilder.group({
      postcode: [2200, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      deliveryZones: ['2200,2100', Validators.required],
      deliveryCost: ['2', Validators.required],
      minimumOrder: ['10', Validators.required],
      restaurantCategory: [this.mockRestaurantCategories[0], Validators.required],
      averagePricePerPerson: [this.averagePricePerPersonRanges[0], Validators.required],
      minItemPrice: ['2'],
      maxItemPrice: ['14'],
    });
  }

  getCurrentValueDeliveryTimes(event) {
    this.currentDeliveryTimes = event.value;
  }

  dateChangedDeliveryTimes(event) {
    this.currentDeliveryTimes = event.value;
  }

  onSubmit() {
    if (this.restaurantInformationForm.valid) {
      this.restaurantInformationForm.value.delivery_times = this.currentDeliveryTimes;

      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.append('X-FT', this.localStorage.retrieve('jwt'));

      this.http.post(AppSettings.API_ENDPOINT + 'demo', this.restaurantInformationForm.value, {
        headers: httpHeaders,
      }).subscribe((response) => {
        this.appGlobals.setCurrentPrediction(response);
        this.router.navigate(['/prediction']).then();
      });

    }
  }
}
