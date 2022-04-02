import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IFeature, IPlan} from "../models/models";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {first, map, mergeMap, switchMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plans$ = new BehaviorSubject<IPlan[]>(null);
  private plansColl: AngularFirestoreCollection<IPlan>;
  private featuresColl: AngularFirestoreCollection<IFeature>;

  constructor(private afs: AngularFirestore) {
    this.plansColl = this.afs.collection<IPlan>('plans');
    this.featuresColl = this.afs.collection<IFeature>('features');


  }

  getPlan(id: string): IPlan {
    return this.plans$.value.find(obj => obj.id === id)
  }

  getPlans(){
    return this.plansColl.valueChanges({idField: 'id'})
      .pipe(
        mergeMap((plans)=>{
          return this.featuresColl.valueChanges({idField: 'id'})
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
