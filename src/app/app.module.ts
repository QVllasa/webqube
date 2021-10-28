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
import { OurWorkComponent } from './pages/our-work/our-work.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {NgParticlesModule} from "ng-particles";
import { RegisterComponent } from '../@webqube/components/dialog/register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {webqubeModule} from "../@webqube/webqube.module";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import {AngularFireFunctionsModule} from "@angular/fire/compat/functions";
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import {AngularFireModule} from "@angular/fire/compat";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {process} from "@angular/compiler-cli/ngcc";
import { WorkDetailsComponent } from './pages/our-work/work-details/work-details.component';


function mode(){
  if (environment.production){
    return[];
  }
  return [{ provide: USE_FUNCTIONS_EMULATOR, useValue: ['localhost', 5001] },
    { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8080] },]
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PricingComponent,
    ProductsComponent,
    OurWorkComponent,
    AboutUsComponent,
    RegisterComponent,
    WorkDetailsComponent
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
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [...mode()],
  bootstrap: [AppComponent]
})
export class AppModule { }

