import { NgModule }                                 from '@angular/core';
import { CommonModule }        from '@angular/common';

import { ProfileComponent, LoginComponent,
  RegisterComponent, EditProfileComponent,
  LogoutComponent, ProfileNavComponent,
ChangePasswordComponent, ForgotPasswordComponent, ResetPasswordComponent }            from './index'
import { RouterModule, Routes }        from '@angular/router';
import { AuthGuard }                from '../_guards/auth.guard';

import { FormsModule,
    ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }               from '@angular/http';



export const ACCOUNT_ROUTES:Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'reset_password', component: ResetPasswordComponent },
  { path: '', component: ProfileNavComponent, canActivate: [AuthGuard],
    children: [
      { path: 'shop', loadChildren: 'app/shop/shop.module#ShopModule', canActivate: [AuthGuard]},
      { path: '', component: ProfileComponent, },
      { path: 'edit', component: EditProfileComponent, },
      { path: 'changepassword', component: ChangePasswordComponent, },
      { path: 'logout', component: LogoutComponent },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(ACCOUNT_ROUTES)
  ],
  declarations: [
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    LogoutComponent,
    ProfileNavComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [
    AuthGuard,
  ],
})
export class AccountModule { }