import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/password-recovery/recovery.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { RoleGuardService } from './services/role-guard.service';
import { TeachingComponent } from './pages/teaching/teaching.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { EditModuleComponent } from './pages/edit-module/edit-module.component';
import { EditCategoryComponent } from './pages/categories/edit-category/edit-category.component';
import { CoursesComponent } from './pages/teaching/courses/courses.component';
import { NewCourseComponent } from './pages/teaching/new-course/new-course.component';
import { CategoryResolverService } from './pages/categories/category-resolver.service';
import { EditSubcategoryComponent } from './pages/subcategories/edit-subcategory/edit-subcategory.component';
import { SubcategoryResolverService } from './pages/subcategories/subcategory-resolver.service';
import { SearchComponent } from './pages/catalog/search/search.component';
import { MainCoursesComponent } from './pages/catalog/main-courses/main-courses.component';
import { CourseComponent } from './pages/course/course.component';
import { CourseResolverService } from './pages/course/course-resolver.service';
import { InfoCourseComponent } from './pages/teaching/info-course/info-course.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { LearningCoursesComponent } from './pages/my-courses/learning-courses/learning-courses.component';
import { FavoriteCoursesComponent } from './pages/my-courses/favorite-courses/favorite-courses.component';
import {UserSettingsComponent} from "./pages/user-settings/user-settings.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import { EditProfileComponent } from './pages/user-settings/edit-profile/edit-profile.component';
import { AddSocialComponent } from './pages/user-settings/add-social/add-social.component';
import { EditLessonComponent } from './pages/edit-lesson/edit-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children: [
      {
        path: '',
        component: MainCoursesComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      }
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'newPassword', component: NewPasswordComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'userSettings', component: UserSettingsComponent, children: [
      {path: 'editProfile', component: EditProfileComponent},
      {path: 'addSocialNetworks', component: AddSocialComponent},
      {path: 'newPassword', component: NewPasswordComponent},
    ]},
  {path: 'newPassword', component: NewPasswordComponent},
  {
    path: 'teaching',
    component: TeachingComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']},
    children: [
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'new',
        component: NewCourseComponent,
      }
    ]
  },
  {
    path: 'myCourses',
    component: MyCoursesComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']},
    children: [
      {
        path: 'learning',
        component: LearningCoursesComponent,
      },
      {
        path: 'favorite',
        component: FavoriteCoursesComponent,
      }
    ]
  },
  {
    path: 'editCourse',
    component: EditCourseComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'editModule/:id',
    component: EditModuleComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'add-category',
    component: EditCategoryComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin']},
    resolve: {
      category: CategoryResolverService
    }
  },
  {
    path: 'add-subcategory/:id',
    component: EditSubcategoryComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin']},
  },
  {
    path: 'edit-subcategory/:id',
    component: EditSubcategoryComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin']},
    resolve: {
      subcategory: SubcategoryResolverService
    }
  },
  {
    path: 'course/:id',
    component: CourseComponent,
    resolve: {
      course: CourseResolverService
    }
  },
  {
    path: 'syllabus/program/:id',
    component: InfoCourseComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'edit-lesson/:id',
    component: EditLessonComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
