import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
