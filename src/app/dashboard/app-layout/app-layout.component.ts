import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  navigationItems = [
    {path: 'projects', label: 'Projekte', badge: ''},
    {path: 'test', label: 'test', badge: ''},
  ]

  user:any ;

  routeTitle: string = '';

  constructor(public route: ActivatedRoute, private router: Router, private auth: AngularFireAuth) {
    this.router.events.subscribe(() => {
      this.routeTitle = this.route.firstChild?.snapshot.data.title;
    })
    this.auth.user.subscribe((user)=>{
      this.user =  user;
    })
  }

  ngOnInit(): void {
  }

}
