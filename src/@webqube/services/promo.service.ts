import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {IPromo} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class PromoService {


  constructor(private afs: AngularFirestore) {
  }


  async fetchPromo(input: string): Promise<firebase.firestore.QuerySnapshot<IPromo>> {
    return await this.afs.collection<IPromo>('promos').ref.where('code', '==', input).get();
  }

  async checkPromoCode(input: string): Promise<boolean> {
    const res = await this.fetchPromo(input)
    return res.empty;
  }

}
