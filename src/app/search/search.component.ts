import { Component } from '@angular/core';

@Component({
    selector: `order-search-page`,
    template: `<order-search [(searchQuery)]="searchparams" (searchClick)="fetchOrders()"></order-search>    
        <quick-filter (filterChangeEvent)="filterChanged($event);"></quick-filter>
        <detail-view [customerDetails]="selectedCustomerDetails" (closeDetails)="closeDetailView()" ></detail-view>`
})
export class SearchPageComponent {
    // order search
    searchparams: object ={};
    fetchOrders() {
        console.log(this.searchparams);
    }

    //quick filter
    filterChanged (e) {
        console.log("filter with ", e)
    }

    // details view
    selectedCustomerDetails: object = {
        firstName: "Andrwe",
        surName: "Bryan",
        email: "asd@asd.com",
        status: "reviewed",
        phone:  "00-000-000",
        text1: "appleseed alpha",
        text2: "birthday party"
    }
    closeDetailView () {
        console.log("Details View to be closed");
    }
}