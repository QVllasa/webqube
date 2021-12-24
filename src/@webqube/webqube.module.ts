import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import {IndividualRequestComponent} from "./components/dialog/individual-request/individual-request.component";
import {RegisterComponent} from "./components/dialog/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {RequestComponent} from "./components/dialog/request/request.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatDialogModule,
  ],
  exports: [
    FooterComponent,
    IndividualRequestComponent,
    RegisterComponent,
    RequestComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    }
  ],
  declarations: [
    FooterComponent,
    IndividualRequestComponent,
    RegisterComponent,
    RequestComponent
  ]
})
export class webqubeModule {
}
