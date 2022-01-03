import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule
} from '@angular/material/form-field';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import {IndividualRequestComponent} from "./components/dialog/individual-request/individual-request.component";
import {RegisterComponent} from "./components/dialog/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {RequestComponent} from "./components/dialog/request/request.component";
import {AddProjectComponent} from "./components/dialog/add-project/add-project.component";
import {MatSelectModule} from "@angular/material/select";


import { AuthComponent } from './components/dialog/auth/auth.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatSnackBarModule
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
    RequestComponent,
    AddProjectComponent,
    AuthComponent
  ]
})
export class webqubeModule {
}
