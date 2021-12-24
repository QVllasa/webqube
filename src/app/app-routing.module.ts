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
import {ProjectsComponent} from "./dashboard/projects/projects.component";
import {PagesLayoutComponent} from "./pages/pages-layout/pages-layout.component";
import {AppLayoutComponent} from "./dashboard/app-layout/app-layout.component";
import {TestComponent} from "./dashboard/test/test.component";

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      {path: '', component: IndexComponent},
      {path: 'pricing', component: PricingComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'tech-blog', component: ProductsComponent},
      {path: 'our-work', component: OurWorkComponent},
      {path: 'work-details/:id', component: WorkDetailsComponent},
      {path: 'jobs', component: JobsComponent},
      {path: 'legal', component: LegalComponent},
      {path: 'privacy', component: PrivacyComponent}
    ]
  },

  {
    path: 'dashboard',
    component: AppLayoutComponent,
    children: [
      {path: '', redirectTo: 'projects', pathMatch:'full'},
      {path: 'projects', component: ProjectsComponent, data: {title: 'Deine Projekte'}},
      {path:'test', component: TestComponent,  data: {title:'Test'}}
    ]
  },


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
