import { Component, OnInit } from '@angular/core';
import {team} from "../../../@webqube/static";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IClient, IMessage} from "../../../@webqube/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  isLoading: boolean = false;
  isSuccess: boolean = false;
  team = team;
  messageCollection: AngularFirestoreCollection<IMessage>;
  form = new FormGroup({
    name: new FormControl({value:'', disabled: this.isLoading}, [Validators.required]),
    email: new FormControl({value:'', disabled: this.isLoading}, [Validators.required, Validators.email]),
    message: new FormControl({value:'', disabled: this.isLoading}, [Validators.required]),
    phone: new FormControl({value:'', disabled: this.isLoading}),
  });

  messageObj: IMessage;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.messageCollection = this.afs.collection<IMessage>('messages');
    this.form.valueChanges.subscribe((data)=>{
      this.messageObj = data
    })
  }

  onSend() {
    this.isLoading = true;
    if (!this.form.valid) {
      console.log("not valid")
      this.isLoading = false;
      return;
    }
    this.messageCollection.add(this.messageObj).then(()=>{
      this.isLoading = false;
      this.isSuccess = true;
      setTimeout(()=>{
        this.isSuccess = false;
        this.form.reset();
      },5000)
    }).catch(err=>{
      console.log(err)
    })
  }

  get f() {
    return this.form.controls;
  }

}
