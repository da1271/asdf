import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/Rx';

import { UserModule } from './user/user/user.module';
import { ToastrService } from './common/toastr.service';
import { AuthGuard } from './user/auth.guard';
import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';
import { LoginComponent } from './home/login/login.component';
import { AboutComponent } from './home/about/about.component';
import { SearchModule } from './search/search.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login.component';
import { FindUserComponent } from './admin/user-management-components/find-user/find-user.component';
import { EditUserComponent } from './admin/user-management-components/edit-user/edit-user.component';
import { UserManagementCoreComponent } from './admin/management-core/user-management-core/user-management-core.component';
import { RegisterComponent } from './admin/user-management-components/register/register.component';
import { UserManagementCoreModule } from './admin/management-core/management-core.module';
import { GroupManagementCoreComponent } from './admin/management-core/group-management-core/group-management-core.component';
// import { ListViewComponent } from './list-view/list-view.component';
// import { Filter2Pipe } from './filter2.pipe';
// import { AddGroupComponent } from './admin/group-management-component/add-group/add-group.component';
// import { FindGroupComponent } from './admin/group-management-component/find-group/find-group.component';
// import { EditGroupComponent } from './admin/group-management-component/edit-group/edit-group.component';
// import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    AboutComponent,
    // ListViewComponent,
    // Filter2Pipe,
    // GroupManagementCoreComponent,
    // AddGroupComponent,
    // FindGroupComponent,
    // EditGroupComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    SearchModule,
    ReactiveFormsModule,
    HttpModule,
    UserModule,
    UserManagementCoreModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'about', component: AboutComponent},
      { path: 'userManagement', component: UserManagementCoreComponent},
      { path: 'groupManagement', component: GroupManagementCoreComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],

  providers: [
  ToastrService,
  AuthService,
  AuthGuard,
  UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
