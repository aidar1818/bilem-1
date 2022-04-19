import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { LoginError, LoginFacebookUser, LoginUserData } from '../../models/user.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { loginFacebookRequest, loginUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit(): void {
    this.authStateSub = this.authService.authState.subscribe((user: SocialUser) => {
      const userData: LoginFacebookUser = {
        id: user.id,
        authToken: user.authToken,
        email: user.email,
        name: user.name,
      };
      this.store.dispatch(loginFacebookRequest({userData}));
    });
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
