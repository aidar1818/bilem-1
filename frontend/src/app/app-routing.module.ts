import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/password-recovery/recovery.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'newPassword', component: NewPasswordComponent},
  {
    path: 'edit-category',
    component: EditCategoryComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
