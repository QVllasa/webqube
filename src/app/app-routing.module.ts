import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {PricingComponent} from "./pages/pricing/pricing.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ProductsComponent} from "./pages/products/products.component";
import {OurWorkComponent} from "./pages/our-work/our-work.component";
import {WorkDetailsComponent} from "./pages/our-work/work-details/work-details.component";
import {JobsComponent} from "./pages/jobs/jobs.component";
import {LegalComponent} from "./pages/legal/legal.component";
import {PrivacyComponent} from "./pages/privacy/privacy.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'tech-blog',
    component: ProductsComponent
  },
  {
    path: 'our-work',
    component: OurWorkComponent
  },
  {
    path: 'work-details/:id',
    component: WorkDetailsComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
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
