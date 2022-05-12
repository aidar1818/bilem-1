import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CodeUserData,
  EditPasswordData,
  EmailData,
  googleLoginUserData,
  LoginFacebookUser,
  LoginUserData, profileUserData,
  RegisterUserData, socialNetworks,
  User
} from '../models/user.model';
import { environment, environment as env } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData) {
    return this.http.post<User>(env.apiUrl + '/users', userData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }

  loginWithFacebook(userData: LoginFacebookUser) {
    return this.http.post<User>(env.apiUrl + '/users/facebookLogin', userData);
  }

  loginGoogle(userData: googleLoginUserData){
    return this.http.post<User>(environment.apiUrl + '/users/googleLogin', userData);
  }

  recoveryPassword(email: EmailData) {
    return this.http.post<User>(environment.apiUrl + `/users/recovery`, email).pipe(
      map(response => {
        return response;
      })
    );
  }

  sendCode(userData: CodeUserData) {
    console.log(userData)
    return this.http.post<string>(environment.apiUrl + `/users/checkCode`, userData).pipe(
      map(response => {
        return response;
      })
    );
  }

  editPassword(password: EditPasswordData) {
    return this.http.put(environment.apiUrl + `/users/editPassword`, password);
  }

  getUser() {
    return this.http.get<User>(env.apiUrl + '/users').pipe(
      map(response => {
        return new User(
          response._id,
          response.email,
          response.token,
          response.displayName,
          response.role,
          response.aboutMe,
          response.myCourses,
          response.favoriteCourses,
          response.socialNetworks,
        );
      })
    );
  }

  editProfile(userData: profileUserData) {
    return this.http.put<User>(env.apiUrl + '/users/userEditProfile', userData).pipe(
      map(response => {
        return new User(
          response._id,
          response.email,
          response.token,
          response.displayName,
          response.role,
          response.aboutMe,
          response.myCourses,
          response.favoriteCourses,
          response.socialNetworks,
        );
      })
    );
  }

  addSocialNetworks(socialNetworks: socialNetworks) {
    return this.http.post<User>(env.apiUrl + '/users/addSocialNetworks', socialNetworks).pipe(
      map(response => {
        return new User(
          response._id,
          response.email,
          response.token,
          response.displayName,
          response.role,
          response.aboutMe,
          response.myCourses,
          response.favoriteCourses,
          response.socialNetworks
        );
      })
    );
  }
}
