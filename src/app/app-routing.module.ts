import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
