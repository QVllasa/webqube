import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule
} from '@angular/material/form-field';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import {IndividualRequestComponent} from "./components/dialogs/individual-request/individual-request.component";
import {RegisterComponent} from "./components/dialogs/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {RequestComponent} from "./components/dialogs/request/request.component";
import {AddProjectComponent} from "./components/dialogs/add-project/add-project.component";
import {MatSelectModule} from "@angular/material/select";
import { AuthComponent } from './components/dialogs/auth/auth.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CustomSpinnerDirective} from "./directives/custom-spinner.directive";
import { PayMilstoneComponent } from './components/dialogs/pay-milstone/pay-milstone.component';
import {NgxPayPalModule} from "ngx-paypal";
import {MatIconModule} from "@angular/material/icon";


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
        MatSnackBarModule,
        NgxPayPalModule,
        MatIconModule
    ],
  exports: [
    FooterComponent,
    IndividualRequestComponent,
    RegisterComponent,
    RequestComponent,
    CustomSpinnerDirective,
    CustomSpinnerDirective
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
    AuthComponent,
    CustomSpinnerDirective,
    CustomSpinnerDirective,
    CustomSpinnerDirective,
    PayMilstoneComponent,
  ]
})
export class webqubeModule {
}
