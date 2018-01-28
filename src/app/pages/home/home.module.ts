import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HOME_ROUTING } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateSchedulingModule } from '../../components/datescheduling';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HOME_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    DateSchedulingModule,
    HttpClientModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})

export class HomeModule {}
