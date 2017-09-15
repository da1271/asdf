import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDatepickerModule, MdInputModule, MdNativeDateModule, MdGridListModule} from '@angular/material';
import { DataTableModule } from "angular-4-data-table";
import { SearchModule } from '../../search/search.module';
import { UserModule } from '../../user/user/user.module';
import { FilterPipe } from '../../filter.pipe';
import { Filter2Pipe } from '../../filter2.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { UserManagementCoreComponent } from './user-management-core/user-management-core.component';
import { FindUserComponent } from '../user-management-components/find-user/find-user.component';
import { EditUserComponent } from '../user-management-components/edit-user/edit-user.component';
import { RegisterComponent } from '../user-management-components/register/register.component';

import { GroupManagementCoreComponent } from './group-management-core/group-management-core.component';
import { FindGroupComponent } from '../group-management-component/find-group/find-group.component';
import { EditGroupComponent } from '../group-management-component/edit-group/edit-group.component';
import { AddGroupComponent } from '../group-management-component/add-group/add-group.component';
import { ListViewComponent } from '../user-management-components/list-view/list-view.component';

import { ToastrService } from '../../common/toastr.service';
import { AuthGuard } from '../../user/auth.guard';
import { AuthService } from '../../user/auth.service';
import { UserService } from '../../user/user.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SearchModule,
    ReactiveFormsModule,
    HttpModule,
    UserModule,
    NgxDatatableModule 

  ],
  declarations: [
  FindUserComponent,
  EditUserComponent,
  RegisterComponent,
  UserManagementCoreComponent,
  GroupManagementCoreComponent,
  FilterPipe,
  Filter2Pipe,
  FindGroupComponent,
  EditGroupComponent,
  AddGroupComponent,
  ListViewComponent
],

  providers: [
    ToastrService,
    AuthService,
    AuthGuard,
    UserService
  ]
})
export class UserManagementCoreModule { }
