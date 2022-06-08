import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IHosting} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class HostingService {

  private hostingsColl: AngularFirestoreCollection<IHosting>;

  constructor(private afs: AngularFirestore) {
    this.hostingsColl = this.afs.collection<IHosting>('STATIC_HOSTINGS');
  }
}
