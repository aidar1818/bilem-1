export interface User {
  _id: string,
  email: string,
  token: string,
  displayName: string,
  role: string,
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
