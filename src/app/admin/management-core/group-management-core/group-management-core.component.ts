import { Component, OnInit } from '@angular/core';
import { AddGroupComponent } from '../../group-management-component/add-group/add-group.component';
import { FindGroupComponent } from '../../group-management-component/find-group/find-group.component';

import { UserManagementCoreModule } from '../management-core.module'

@Component({
  selector: 'app-group-management-core',
  templateUrl: './group-management-core.component.html',
  styleUrls: ['./group-management-core.component.css']
})
export class GroupManagementCoreComponent implements OnInit {

  currentGroup = "";

  constructor() { }

  ngOnInit() {
  }

  buttonGroupWasClicked: boolean = true;
  groupTabOpen: boolean = true;
  onGroupEdit: boolean = false;
  //onEdit: boolean = Does bool exist ? @Input() bool: boolean; : true;

  editGroupButtonClicked(clicked:boolean) {
    this.onGroupEdit = true;
  }
  cancelGroupButtonClicked(clicked:boolean) {
    this.onGroupEdit = false;
  }

  setGroupButtonClicked(clicked: boolean) {
      this.buttonGroupWasClicked = clicked;
  }

  tabGroupWasOpen(clicked: boolean){
      this.groupTabOpen = clicked;
  }
    editDoyle(e){
      this.currentGroup = e;
      // console.log(this.currentGroup)
    }
}
