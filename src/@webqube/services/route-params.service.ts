import { Injectable } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteParamsService {
  private routeParamsChangeSource = new ReplaySubject<Params>();
  routeParamsChange$ = this.routeParamsChangeSource.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      // @ts-ignore
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        let r = this.route;
        while (r.firstChild) r = r.firstChild;
        r.params.pipe(first()).subscribe((params: Params) => {
          this.routeParamsChangeSource.next(params);
        });
      });
  }
}
