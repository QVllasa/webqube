import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {IUser} from "../../../@webqube/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: IUser | null;
  isLoading: boolean = false;
  isSuccess: boolean = false;


  userForm = new FormGroup({
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    displayName: new FormControl({value: '', disabled: true}, [Validators.required]),
    // phoneNumber: new FormControl({value: '', disabled: true}),
  });

  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      this.userForm.patchValue({
        displayName: user?.displayName,
        // phoneNumber: user?.phoneNumber,
        email: user?.email,
      });
    })

  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(data => {
      this.user = data;
    })
  }

  onResetPassword() {
    this.isLoading = true;
    if (!this.user?.email) {
      return;
    }
    this.auth.sendPasswordResetEmail(this.user.email).then(() => {
      this.isLoading = false;
      this.isSuccess = true;
    })
  }

  editEmail() {
    this.auth.currentUser
      .then(user => {
        return user?.updateEmail(<string>this.user?.email)
      })
      .then(() => {
        this.userForm.get('email')?.disable();
      })
  }

  editDisplayName() {
    this.auth.currentUser
      .then(user => {
        return user?.updateProfile({displayName: this.user?.displayName})
      })
      .then(() => {
        this.userForm.get('displayName')?.disable();
      })
  }

  onEdit(control: string) {
    if (this.userForm.get(control)?.disabled) {
      this.userForm.get(control)?.enable();
      return;
    }
    switch (control) {
      case 'displayName': {
        this.editDisplayName();
        break;
      }
      case 'email': {
        this.editEmail();
        break;
      }
    }
  }

}
