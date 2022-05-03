import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IFeatures, IPlan} from "../models/models";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {first, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
import {Info} from "luxon";
import features = Info.features;

@Injectable({
  providedIn: 'root'
})
export class PlanService {


  private plansColl: AngularFirestoreCollection<IPlan>;
  private featuresColl: AngularFirestoreCollection<IFeatures>;

  plans$: BehaviorSubject<IPlan[]> = new BehaviorSubject<IPlan[]>(null);

  constructor(private afs: AngularFirestore) {
    this.plansColl = this.afs.collection<IPlan>('plans');
    this.featuresColl = this.afs.collection<IFeatures>('features');
  }

  getPlan(id: string): Promise<IPlan> {
    return this.plansColl.doc(id).valueChanges({idField: 'id'})
      .pipe(
        first(),
        tap((plan)=>console.log('get plan', plan)),
        mergeMap(plan => {
          return this.featuresColl.valueChanges()
            .pipe(
              first(),
              map(features => {
                const featuresObject = features[0]
                let keys = Object.keys(featuresObject);
                keys.forEach((key) => {
                  plan.features[key] = {...plan.features[key], ...featuresObject[key]}
                })
                return plan;
              })
            )
        })
      ).toPromise();
  }

  getPlans(): Promise<(IPlan & { id: string })[]> {
    return this.plansColl.valueChanges({idField: 'id'})
      .pipe(
        first(),
        mergeMap((plans) => {
          return this.featuresColl.valueChanges()
            .pipe(
              first(),
              map((features) => {
                const featuresObject = features[0]
                let keys = Object.keys(featuresObject);
                keys.forEach((key) => {
                  plans.forEach((plan) => {
                    plan.features[key] = {...plan.features[key], ...featuresObject[key]}
                  })
                })
                plans.sort((a, b) => {
                  return a.order - b.order;
                });
                return plans
              })
            )
        })
      ).toPromise();

  }

}
