import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {
  addSocialNetworksFailure,
  addSocialNetworksRequest, addSocialNetworksSuccess,
  editPasswordFailure,
  editPasswordRequest,
  editPasswordSuccess,
  editProfileFailure,
  editProfileRequest,
  editProfileSuccess,
  fetchUserFailure, fetchUserProfileFailure, fetchUserProfileRequest, fetchUserProfileSuccess,
  fetchUserRequest,
  fetchUserSuccess,
  loginFacebookFailure,
  loginFacebookRequest,
  loginFacebookSuccess,
  loginGoogleFailure,
  loginGoogleRequest,
  loginGoogleSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  sendEmailRequest,
  sendEmailSuccess,
  sendUserCodeFailure,
  sendUserCodeRequest,
  sendUserCodeSuccess
} from './users.actions';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { AppState } from '../types';
import { Store } from '@ngrx/store';
import { SocialAuthService } from 'angularx-social-login';
import { fetchCoursesRequest } from '../course/course.actions';
import { User } from '../../models/user.model';


@Injectable()
export class UsersEffects {
  user: Observable<User | null>;
  userData!: User | null;

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      if(user) {
        this.userData = user;
      }
    });
  }

  getUser = createEffect(() => this.actions.pipe(
    ofType(fetchUserRequest),
    mergeMap(() => this.usersService.getUser().pipe(
      map(user => fetchUserSuccess({user})),
      this.helpers.catchServerError(fetchUserFailure)
    ))
  ))

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Успешная регистрация');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ))

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Вход выполнен');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ))

  loginFacebook  = createEffect(() => this.actions.pipe(
    ofType(loginFacebookRequest),
    mergeMap(({userData}) => this.usersService.loginWithFacebook(userData).pipe(
      map(user => loginFacebookSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Успешная регистрация через Facebook');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginFacebookFailure)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(async () => {
          await this.router.navigate(['/']);
          this.store.dispatch(fetchCoursesRequest())
          await this.auth.signOut();
          this.helpers.openSnackbar('Выход из аккаунта');
        })
      );
    }))
  )

  sendEmail = createEffect(() => this.actions.pipe(
    ofType(sendEmailRequest),
    mergeMap( ({email}) => this.usersService.recoveryPassword(email).pipe(
      map(userData => sendEmailSuccess({userData})),
    ))
  ));

  sendCode = createEffect(() => this.actions.pipe(
    ofType(sendUserCodeRequest),
    mergeMap(({userData}) => this.usersService.sendCode(userData).pipe(
      map(code => {
        return sendUserCodeSuccess({code})
      }),
      this.helpers.catchServerError(sendUserCodeFailure)
    ))
  ));

  editPassword = createEffect(() => this.actions.pipe(
    ofType(editPasswordRequest),
    mergeMap( ({password}) => this.usersService.editPassword(password).pipe(
      map(() => editPasswordSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Пароль обновлён');
        void this.router.navigate(['/profile']);
      })
    )),
    catchError(() => of(editPasswordFailure({error: 'Что-то пошло не так'})))
  ));

  loginGoogle = createEffect(() => this.actions.pipe(
    ofType(loginGoogleRequest),
    mergeMap(({userData}) => this.usersService.loginGoogle(userData).pipe(
      map(user => loginGoogleSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Успешная регистрация через Google!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginGoogleFailure)
    ))
  ));

  editProfile = createEffect(() => this.actions.pipe(
    ofType(editProfileRequest),
    mergeMap( ({userData}) => this.usersService.editProfile(userData).pipe(
      map(user => editProfileSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Ваш профиль обновлён');
        void this.router.navigate(['/profile']);
      })
    )),
    catchError(() => of(editProfileFailure({error: 'Что-то пошло не так'})))
  ));

  addSocialNetworks = createEffect(() => this.actions.pipe(
    ofType(addSocialNetworksRequest),
    mergeMap( ({socialNetworks}) => this.usersService.addSocialNetworks(socialNetworks).pipe(
      map(user => addSocialNetworksSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Ссылки на соцсети обновлены');
        void this.router.navigate(['/profile/' + this.userData?._id]);
      })
    )),
    catchError(() => of(addSocialNetworksFailure({error: 'Что-то пошло не так'})))
  ));

  fetchUserProfileData = createEffect(() => this.actions.pipe(
    ofType(fetchUserProfileRequest),
    mergeMap(({userId}) => this.usersService.getUserProfileData(userId).pipe(
      map(userProfileData => fetchUserProfileSuccess({userProfileData})),
      catchError(() => of(fetchUserProfileFailure({error: 'Невозможно загрузить данные профайла пользователя!'})))
    ))
  ));
}
