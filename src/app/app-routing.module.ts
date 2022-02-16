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
import {AccountComponent} from "./dashboard/account/account.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ProjectsDetailsComponent} from "./dashboard/projects/projects-details/projects-details.component";
import {ScrumboardComponent} from "./dashboard/projects/projects-details/scrumboard/scrumboard.component";

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
          {path: ':boardID', component: ScrumboardComponent}
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
