import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IFeatures, IPlan} from "../models/models";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {first, map, mergeMap, switchMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plans$ = new BehaviorSubject<IPlan[]>(null);
  private plansColl: AngularFirestoreCollection<IPlan>;
  private featuresColl: AngularFirestoreCollection<IFeatures>;

  constructor(private afs: AngularFirestore) {
    this.plansColl = this.afs.collection<IPlan>('plans');
    this.featuresColl = this.afs.collection<IFeatures>('features');
  }

  getPlan(id: string): IPlan|string {
    if (!this.plans$){
      return 'Kein Plan gefunden';
    }
    return this.plans$.value.find(obj => obj.id === id)
  }

  getPlans(): Observable<(IPlan & {id: string})[]>{
    return this.plansColl.valueChanges({idField: 'id'})
      .pipe(
        mergeMap((plans)=>{
          return this.featuresColl.valueChanges()
            .pipe(
              map((features)=>{
                const featuresObject =features[0]
                let keys = Object.keys(featuresObject);
                keys.forEach( (key)=>{
                  plans.forEach((plan)=>{
                    plan.features[key] = {... plan.features[key],...featuresObject[key]}
                  })
                })
                plans.sort((a, b) => {
                  return a.order - b.order;
                });
                return plans
              })
            )
        })
      )

  }

}
