import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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

  routeTitle: string = '';

  constructor(public route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(() => {
      this.routeTitle = this.route.firstChild?.snapshot.data.title;
    })
  }

  ngOnInit(): void {
  }

}
