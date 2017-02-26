import { NgModule }            				from '@angular/core';
import { RouterModule, Routes }				from '@angular/router';
import { LandingComponent }					from "./landing/landing.component";
import { PageNotFoundComponent }		    from "./page-not-found/page-not-found.component";
import { ProfileComponent, LoginComponent,
	RegisterComponent, EditProfileComponent,
	LogoutComponent, ProfileNavComponent, ChangePasswordComponent }		    			from "./account/index";
import { AuthGuard }						from "./_guards/auth.guard";

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileNavComponent, canActivate: [AuthGuard],
		children: [
      { path: 'edit', component: EditProfileComponent, },
			{ path: 'changepassword', component: ChangePasswordComponent, },
			{ path: '', component: ProfileComponent, },
  			{ path: 'logout', component: LogoutComponent },
		]
	},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
