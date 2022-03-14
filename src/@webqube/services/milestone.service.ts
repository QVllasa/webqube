import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IMilestone} from "../models/models";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  milestones = new BehaviorSubject<IMilestone[]>(null);
  private milestoneColl: AngularFirestoreCollection<IMilestone>;

  constructor(private afs: AngularFirestore) {
    this.milestoneColl = this.afs.collection<IMilestone>('milestones');

    this.milestoneColl.valueChanges({idField: 'id'})
      .pipe(take(1))
      .subscribe(milestones => {
        this.milestones.next(milestones)
      })
  }
}
