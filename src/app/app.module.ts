import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {IndexComponent} from "./pages/index/index.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { PricingComponent } from './pages/pricing/pricing.component';
import { ProductsComponent } from './pages/products/products.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {NgParticlesModule} from "ng-particles";
import { RegisterComponent } from '../@webqube/components/dialog/register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {webqubeModule} from "../@webqube/webqube.module";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PricingComponent,
    ProductsComponent,
    GaleryComponent,
    AboutUsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    webqubeModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    NgParticlesModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
