
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams  } from "@angular/common/http";
import { RegisterComponent } from '../../user-management-components/register/register.component';
import { FindUserComponent } from '../../user-management-components/find-user/find-user.component';

import { UserManagementCoreModule } from '../management-core.module'

import { SearchQuery } from '../../model/searchQuery.model';
import { SearchResults } from '../../model/searchResults.model';
import { UserDetails } from '../../model/userDetails.model';

@Component({
  selector: 'app-user-management-core',
  templateUrl: './user-management-core.component.html',
  styleUrls: ['./user-management-core.component.css']

})
export class UserManagementCoreComponent implements OnInit {
  // @Input() onEdit
  currentUser = "";

  @Input() bool: boolean;

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    // order search
  isLoading:boolean = true;
  searchparams = new SearchQuery();
  searchResults : SearchResults;
  searchOrderDetailsResults: UserDetails[];
  // dropDownDataList: SearchDataList;
  isSearchAndDetailToggle: boolean = true;
  isListViewToggle: boolean = true;
  detailViewData: UserDetails;
  selectedOrders: number;
  pageno: number = 1;

  buttonWasClicked: boolean = true;
  tabOpen: boolean = true;
  onEdit: boolean = false;

  fetchOrders() {
          let params = new HttpParams();
          this.isLoading = true;
          this.searchparams.pageno = this.searchparams.pageno || 1;

          // for(let key of Object.keys(this.searchparams)){
          //     if(((this.searchparams[key] instanceof Array) && this.searchparams[key].length) ||
          //     (!(this.searchparams[key] instanceof Array) && this.searchparams[key])) {
          //         params = params.append(key, this.searchparams[key])
          //     }
          // }
          // get the user details on search
          this.http.get<SearchResults>('http://localhost:4000/api/user',{params}) // in the server side it is user && its localhost 4000 not 4200
          .subscribe(
          // Success
              data => {
                  data.users.map( (value)=> { value.isSelected = true; return value;}); //error1
                  this.searchResults = data;
                  this.searchOrderDetailsResults = data.users;
                  this.isLoading = false;
                  if (!this.searchOrderDetailsResults.length) {     //.length is error
                      this.isLoading = true;
                      this.searchparams.pageno = undefined;
                  }
              },
          // Error
              err =>{
                  console.log(err);
                  this.isLoading = true;
              }
          )
      }

  searchUsers() {
      console.log('hello world')
      this.searchparams.pageno = 1;
      this.pageno = this.searchparams.pageno;
      // this.quickFilters = this.quickFilters.map( (filter)=> { filter.checked=false; return filter });
      // this.searchparams.filter = [];
      this.fetchOrders();
  }

  editButtonClicked(clicked:boolean) {
    this.onEdit = true;
  }
  cancelButtonClicked(clicked:boolean) {
    this.onEdit = false;
  }

  setButtonClicked(clicked: boolean) {
      this.buttonWasClicked = clicked;
  }

  tabWasOpen(clicked: boolean){
      this.tabOpen = clicked;
  }

    editJune(e){
      this.currentUser = e;
      console.log(this.currentUser);
    }
  }
