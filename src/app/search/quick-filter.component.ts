import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'quick-filter',
    templateUrl: 'quick-filter.component.html',
    styles: [`
        .quick-filter{padding: 10px 0;    margin-top: 10px;  margin-bottom: 10px; border-bottom: 1px solid #ccc;}
        .quick-filter h2 {     font-size: 17px;    float: left;    margin: 12px 10px 10px 0;}
        .quick-filter label {font-weight: normal;    padding: 5px 20px;    border: 1px solid #666;
                cursor: pointer; border-radius: 30px; margin: 5px;
        }
        .quick-filter label.input-checked { background: #efefef;}
    `]
})
export class QuickFilterComponent {
    @Output() filterChangeEvent = new EventEmitter();
    quickFilters = [
        {
            dispName: "Today",
            key: "today",
            checked: false
        },
        {
            dispName: "Single Orders",
            key: "singleOrders",
            checked: false
        },
        {
            dispName: "Multi item",
            key: "multiItem",
            checked: false
        },
        {
            dispName: "Multi Qty",
            key: "multiQty",
            checked: false
        },
        {
            dispName: "All Pending",
            key: "pending",
            checked: false
        },
        {
            dispName: "Priority Delivery",
            key: "priorDeliv",
            checked: false
        },
        {
            dispName: "72 Hrs +",
            key: "72hrs",
            checked: false
        }
    ];

    //filter check/uncheck 
    filterStateChanged () {
        this.filterChangeEvent.emit(this.quickFilters);
    }
}