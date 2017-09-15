import { Component, OnInit, Input } from '@angular/core';

import { UserDetails } from "../../model/userDetails.model";
import { SearchQuery } from "../../model/searchQuery.model";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
    @Input() searchQuery: SearchQuery;

      private _dataList: UserDetails[]
    @Input()
    set dataList(value: UserDetails[]) {
        this._dataList = value;
        this.setSelectedRows(this._dataList);
    }
    get dataList(): UserDetails[] {
        return this._dataList;
    }

    selectedRows;
    defaultSort;

  constructor() { }

  ngOnInit() {
    // this.defaultSort = [ { prop: this.searchQuery.sortby, dir: this.searchQuery.sortorder} ]
  }

  setSelectedRows ( newDataList: UserDetails[] ) {
      this.selectedRows = newDataList.filter( (obj)=> { return obj.isSelected; })
  }

columns: any[] = [
    { flexGrow: 1, sortable: false, draggable: false, resizeable: false, headerCheckboxable: true, checkboxable: true},
    { name: 'First Name', flexGrow: 4,prop: 'firstname' } ,
    { name: 'Last Name', flexGrow: 3, prop: 'lastname' },
    { name: 'Email', flexGrow: 5, prop: 'email', sortable: true },
    { name: 'Username', flexGrow: 3, prop: 'username', sortable: true },
    { name: 'Group Name', flexGrow: 4, prop: 'group_name', sortable: true },
    // { name: 'Fragrance', flexGrow: 4, prop: 'product_fragrance', sortable: true },
    // { name: 'Qty', flexGrow: 2, prop: 'quantity', sortable: true }
];
}
