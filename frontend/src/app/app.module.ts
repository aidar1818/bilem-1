import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppStoreModule} from "./store/app-store.module";
import {AuthInterceptor} from "./auth.interceptor";
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidatePasswordDirective } from './directives/validate-password.directive';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { RecoveryComponent } from './pages/password-recovery/recovery.component';
import {
  DialogExamplePasswordComponent
} from './pages/password-recovery/dialog-password-recovery/dialog-example-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { HasRolesDirective } from './directives/has-roles.directive';
import { TeachingComponent } from './pages/teaching/teaching.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { MatSelectModule } from '@angular/material/select';
import { FileInputComponent } from './ui/file-input/file-input.component';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile',
      })
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CenteredCardComponent,
    ValidatePasswordDirective,
    ValidateIdenticalDirective,
    RecoveryComponent,
    DialogExamplePasswordComponent,
    NewPasswordComponent,
    ToolbarComponent,
    CatalogComponent,
    EditCategoryComponent,
    HasRolesDirective,
    TeachingComponent,
    EditCourseComponent,
    FileInputComponent,
    FileInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    AppStoreModule,
    BrowserAnimationsModule,
    FlexModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
