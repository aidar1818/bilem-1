import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { RegisterError, RegisterUserData } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { registerUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | RegisterError>;
  errorSub!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit(): void {
    this.errorSub = this.error.subscribe(error => {
      if (error) {
        const msg = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: msg});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  register() {
    const userData: RegisterUserData = this.form.value;
    this.store.dispatch(registerUserRequest({userData}));
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
