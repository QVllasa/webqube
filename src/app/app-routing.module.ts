import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './web/index/index.component';
import {PricingComponent} from "./web/pricing/pricing.component";
import {AboutUsComponent} from "./web/about-us/about-us.component";
import {ProductsComponent} from "./web/products/products.component";
import {OurWorkComponent} from "./web/our-work/our-work.component";
import {WorkDetailsComponent} from "./web/our-work/work-details/work-details.component";
import {JobsComponent} from "./web/jobs/jobs.component";
import {LegalComponent} from "./web/legal/legal.component";
import {PrivacyComponent} from "./web/privacy/privacy.component";
import {ProjectsComponent} from "./app/projects/projects.component";
import {PagesLayoutComponent} from "./web/pages-layout/pages-layout.component";
import {AppLayoutComponent} from "./app/app-layout/app-layout.component";
import {AccountComponent} from "./app/account/account.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ProjectsDetailsComponent} from "./app/projects/projects-details/projects-details.component";
import {ScrumboardComponent} from "./app/projects/projects-details/scrumboard/scrumboard.component";
import {DashboardComponent} from "./app/projects/projects-details/dashboard/dashboard.component";
import {HostingComponent} from "./app/projects/projects-details/hosting/hosting.component";
import {AddonsComponent} from "./app/projects/projects-details/addons/addons.component";

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);

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
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToHome},
    children: [
      {path: '', redirectTo: 'projects', pathMatch: 'full'},
      {path: 'projects', component: ProjectsComponent, data: {title: 'Meine Projekte'}},
      {
        path: 'project/:projectID', component: ProjectsDetailsComponent,
        data: {title: 'Meine Projekte'},
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'boards', component: ScrumboardComponent},
          {path: 'hosting', component: HostingComponent},
          {path: 'addons', component: AddonsComponent}
        ]
      },
      {path: 'account', component: AccountComponent, data: {title: 'Mein Account'}}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'disabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
