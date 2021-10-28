import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {PricingComponent} from "./pages/pricing/pricing.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ProductsComponent} from "./pages/products/products.component";
import {OurWorkComponent} from "./pages/our-work/our-work.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: []
  },
  {
    path: 'pricing',
    component: PricingComponent,
    children: []
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    children: []
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: []
  },
  {
    path: 'our-work',
    component: OurWorkComponent,
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
