import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { googleLoginUserData, LoginFacebookUser, RegisterError, RegisterUserData } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import {
  changeSaveUser,
  loginFacebookRequest,
  loginGoogleRequest,
  registerUserRequest
} from '../../store/users/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | RegisterError>;
  errorSub!: Subscription;
  loading: Observable<boolean>;
  googleLoading: Observable<boolean>;
  fbLoading: Observable<boolean>;
  fbUserData!: LoginFacebookUser;
  googleUserData!: googleLoginUserData;
  fbLoginClick = false;
  googleLoginClick = false;
  authStateSub!: Subscription;

  constructor(private store: Store<AppState>, private authService: SocialAuthService) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
    this.fbLoading = store.select(state => state.users.loginFacebookLoading);
    this.googleLoading = store.select(state => state.users.googleLoading);
  }

  ngOnInit(): void {
    this.authStateSub = this.authService.authState.subscribe((user: SocialUser) => {
      if(!user) return;

      if(this.googleLoginClick){
        if(user.provider === "GOOGLE"){
          this.googleUserData = {
            authToken: user.authToken,
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: user.response.access_token
          }
        }
        this.store.dispatch(loginGoogleRequest({userData: this.googleUserData}));
      }

      if(this.fbLoginClick){
        if(user.provider === "FACEBOOK"){
          this.fbUserData = {
            authToken: user.authToken,
            id: user.id,
            email: user.email,
            name: user.name,
          }
        }
        this.store.dispatch(loginFacebookRequest({userData: this.fbUserData}));
      }
    })
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
    const save = this.form.value.check;
    this.store.dispatch(changeSaveUser({ save }));
    this.store.dispatch(registerUserRequest({userData}));
  }

  fbLogin() {
    this.fbLoginClick = true;
    void this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin() {
    this.googleLoginClick = true;
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.authStateSub.unsubscribe();
  }
}
