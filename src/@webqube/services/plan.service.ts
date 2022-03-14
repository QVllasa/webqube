import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IPlan} from "../models/models";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plans$ = new BehaviorSubject<IPlan[]>(null);
  private plansColl: AngularFirestoreCollection<IPlan>;

  constructor(private afs: AngularFirestore) {
    this.plansColl = this.afs.collection<IPlan>('tiers');

    this.plansColl.valueChanges({idField: 'id'})
      .pipe(take(1), map(tiers => {
        return tiers.sort((a, b) => {
          return a.order - b.order;
        });
      }))
      .subscribe(tiers => {
        this.plans$.next(tiers.map(obj => ({...obj, selected: false})));
      })
  }

  getPlan(id: string): IPlan {
    return this.plans$.value.find(obj => obj.id === id)
  }

}
