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
    {path:'our-work', label: 'Werke'},
    {path:'products', label: 'Tech'},
    {path:'pricing', label: 'Preise'},
    {path:'about-us', label: 'Über Uns'}
  ]

   onTestFunction() {

    const callable = this.fns.httpsCallable('sayHello');
    callable({name: "AAAAAA"}).toPromise().then(res => {console.log(res)});
  }
}
