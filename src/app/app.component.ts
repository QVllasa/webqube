import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webqube';

  navigationItems = [
    {path: '/', label:''},
    {path:'galery', label: 'Galerie'},
    {path:'products', label: 'Products'},
    {path:'pricing', label: 'Preise'},
    {path:'about-us', label: 'Über Uns'}
  ]

}
