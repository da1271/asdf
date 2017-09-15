import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from '../../admin/user-management-components/register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { PasswordComponent } from '../password/password.component';
import { LogoutComponent } from '../logout/logout.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'profile', canActivate: [ AuthGuard], component: ProfileComponent },
      { path: 'password', canActivate: [ AuthGuard], component: PasswordComponent },
      { path: 'logout', canActivate: [ AuthGuard], component: LogoutComponent }
    ])
  ],
  declarations: [
    //RegisterComponent,
    ProfileComponent,
    PasswordComponent,
    LogoutComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ]
})
export class UserModule { }
