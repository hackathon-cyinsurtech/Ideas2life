import { Component, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGlobals } from '../../model/app-globals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prediction',
  templateUrl: 'prediction.html',
})

export class PredictionComponent {
  currentPrediction: any;

  constructor(private appGlobals: AppGlobals) {
    this.appGlobals.currentPrediction.subscribe((value) => {
      this.currentPrediction = value;
    });
  }
}

const routes: Routes = [
  {
    path: '',
    component: PredictionComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [PredictionComponent],
})

export class PredictionModule {}
