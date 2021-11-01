import {Component} from '@angular/core';
import {AngularFireFunctions} from "@angular/fire/compat/functions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webqube';
  constructor(private fns: AngularFireFunctions) {
  }


  navigationItems = [
    {path: '/', label:''},
    {path:'our-work', label: 'Werke', badge:''},
    {path:'tech-blog', label: 'Tech-Blog', badge:'coming soon'},
    {path:'pricing', label: 'Preise', badge:''},
    {path:'about-us', label: 'Über Uns', badge:''}
  ]

}
