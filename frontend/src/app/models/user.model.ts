import { Course } from './course.model';

export class User {
  constructor(
    public _id: string,
    public email: string,
    public token: string,
    public displayName: string,
    public role: string,
    public aboutMe: string,
    public myCourses: MyCourses[],
    public favoriteCourses: Course[],
    public socialNetworks: [],
  ) {
  }
}

export interface MyCourses {
  course: Course,
  passedLessons: [],
  timestamp: Date,
  progress: number,
}

export interface RegisterUserData {
  email: string,
  password: string,
  displayName: string
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface LoginFacebookUser {
  id: string,
  authToken: string,
  email: string,
  name: string,
}

export interface googleLoginUserData {
  authToken: string,
  id: string,
  email: string,
  name: string,
  accessToken: string
}

export interface socialNetworks {
  userId: string,
  fb: string,
  github: string,
  vk: string,
  tw: string,
  instagram: string,
  skype: string,
  tme: string,
  website: string,
  youtube: string,
}

export interface profileUserData {
  _id: string,
  email: string,
  displayName: string,
  aboutMe: string
}

export interface CodeUserData {
  email: string,
  code: string
}

export interface EditPasswordData {
  email: string,
  password: string
}

export interface EmailData {
  email: string,
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}

export interface LoginError {
  error: string
}

export interface CodeError {
  error: string
}
