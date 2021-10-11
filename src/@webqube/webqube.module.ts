import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';




@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            } as MatFormFieldDefaultOptions
        }
    ],
    declarations: []
})
export class webqubeModule {
}
