import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from "@angular/router";




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
    exports: [
        FooterComponent
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
    FooterComponent
  ]
})
export class webqubeModule {
}
