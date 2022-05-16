import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from 'angularx-social-login';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from './store/app-store.module';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
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
import { HasRolesDirective } from './directives/has-roles.directive';
import { TeachingComponent } from './pages/teaching/teaching.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { MatSelectModule } from '@angular/material/select';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { EditCategoryComponent } from './pages/categories/edit-category/edit-category.component';
import { EditModuleComponent } from './pages/edit-module/edit-module.component';
import { CoursesComponent } from './pages/teaching/courses/courses.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageForCoursePipe } from './pipes/imageForCourse.pipe';
import { NewCourseComponent } from './pages/teaching/new-course/new-course.component';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './ui/footer/footer.component';
import { OrderModule } from 'ngx-order-pipe';
import { MatStepperModule } from '@angular/material/stepper';
import { EditSubcategoryComponent } from './pages/subcategories/edit-subcategory/edit-subcategory.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchComponent } from './pages/catalog/search/search.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainCoursesComponent } from './pages/catalog/main-courses/main-courses.component';
import { CourseComponent } from './pages/course/course.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { LearningCoursesComponent } from './pages/my-courses/learning-courses/learning-courses.component';
import { FavoriteCoursesComponent } from './pages/my-courses/favorite-courses/favorite-courses.component';
import { InfoCourseComponent } from './pages/teaching/info-course/info-course.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { CourseCardsComponent } from './ui/course-cards/course-cards.component';
import { CourseCardComponent } from './ui/course-cards/course-card/course-card.component';
import { EditLessonComponent } from './pages/edit-lesson/edit-lesson.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './pages/user-settings/edit-profile/edit-profile.component';
import { AddSocialComponent } from './pages/user-settings/add-social/add-social.component';
import { StarsDirective } from './directives/stars.directive';
import { CoursesByCategoryComponent } from './pages/course/courses-by-category/courses-by-category.component';
import { LessonsSidebarComponent } from './pages/lessons-sidebar/lessons-sidebar.component';
import { FooterHelpComponent } from './pages/footer/footer-help/footer-help.component';
import { FooterContactsComponent } from './pages/footer/footer-contacts/footer-contacts.component';
import { FooterAboutComponent } from './pages/footer/footer-about/footer-about.component';
import { FooterDevelopmentComponent } from './pages/footer/footer-development/footer-development.component';
import { FooterVacancyComponent } from './pages/footer/footer-vacancy/footer-vacancy.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LessonComponent } from './ui/lesson/lesson.component';
import { YouTubeVideoPipe } from './pipes/youTube_video.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoursesBySubcategoryComponent } from './pages/course/courses-by-subcategory/courses-by-subcategory.component';
import { ModalComponent } from './ui/modal/modal.component';
import { LessonsComponent } from './pages/teaching/lessons/lessons.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile',
      })
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleAppId)
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
    FileInputComponent,
    EditModuleComponent,
    CoursesComponent,
    ImageForCoursePipe,
    YouTubeVideoPipe,
    NewCourseComponent,
    FooterComponent,
    EditSubcategoryComponent,
    SearchComponent,
    MainCoursesComponent,
    CourseComponent,
    MainCoursesComponent,
    SidebarComponent,
    InfoCourseComponent,
    SidebarComponent,
    MyCoursesComponent,
    FavoriteCoursesComponent,
    LearningCoursesComponent,
    UserSettingsComponent,
    UserProfileComponent,
    EditProfileComponent,
    AddSocialComponent,
    LearningCoursesComponent,
    CourseCardsComponent,
    CourseCardComponent,
    EditLessonComponent,
    StarsDirective,
    CoursesByCategoryComponent,
    LessonsSidebarComponent,
    CoursesByCategoryComponent,
    CoursesBySubcategoryComponent,
    FooterHelpComponent,
    FooterContactsComponent,
    FooterAboutComponent,
    FooterDevelopmentComponent,
    FooterVacancyComponent,
    LessonComponent,
    ModalComponent,
    LessonsComponent
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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatStepperModule,
    OrderModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ExtendedModule,
    MatExpansionModule,
    MatTooltipModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
