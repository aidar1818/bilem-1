import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { editPasswordRequest } from '../../store/users/users.actions';
import { EditPasswordData, User } from '../../models/user.model';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.sass']
})
export class NewPasswordComponent implements OnDestroy{
  loading!: Observable<boolean>;
  @ViewChild('f') form!: NgForm;
  user: Observable<User | null>;
  email!: string | undefined;
  emailSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.users.loginLoading);
    this.user = store.select(state => state.users.user);
    this.emailSub = this.user.subscribe(user => {
      this.email = <string>user?.email;
    })
  }

  onSubmit() {
    const password: EditPasswordData = {
      email: <string>this.email,
      password: this.form.value.password,
    }
    this.store.dispatch(editPasswordRequest({password: password}));
  }

  ngOnDestroy() {
    if(this.emailSub) {
      this.emailSub.unsubscribe();
    }
  }
}
