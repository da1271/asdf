import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

interface SearchQuery {
    orderId?:string;
    quantity?:string;    
    sku?:string;
    orderStatus?:string;
    orderSrc?:string;
    orderSize?: string;
    skuDesc?: string;
    productForm?: string;
    shippingMtd?: string;
    destCtry?:string;
    age?:string;
    shpToState?: string;
    fragrance?: string;
    fromDate?: number;
    toDate?: number;
}

@Component({
    selector: 'order-search',
    templateUrl: './order-search.component.html',
    styleUrls: ['./order-search.component.css'],
    animations: [
        trigger('shrinkInOut', [      
            transition('* => void', [
                style({height: '*'}),
                animate(250, style({height: 0}))
            ]),
            transition('void => *', [
                style({height: '0'}),
                animate(250, style({height: '*'}))
            ])
        ])
    ]
})
export class OrderSearchComponent implements OnInit {
    @Input() searchQuery: SearchQuery;
    @Output() searchQueryChange = new EventEmitter();
    // searchQuery: SearchQuery = {};
    @Output() searchClick = new EventEmitter();
    skus: string[] = ["single", "multiple"];
    skuDescs: string[] = ["single", "multiple"];
    orderSrcs: string[] = ["UK" , "USA"];

    productForms: string[] = ["Large Jar", "Small Jar"];
    shippingMtds: string[] = ["standard", "new"];
    destCtries: string[] = ["United Kingdom", "USA"];
    fragrances: string[] = ["Cherry Blossom", "Musk"];

    searchViewToggle: boolean = true;
    advanceSearchToggle: boolean = false;

    //max date to be able to select in datepicker
    maxDate = new Date();
    
    fromToDateMismatch: boolean = false;
    ngOnInit () {
        this.searchQuery.sku = this.skus[0];
        this.searchQuery.skuDesc = this.skuDescs[0];
        this.searchQuery.orderSrc = this.orderSrcs[0];
        
        this.searchQuery.productForm = this.productForms[0];
        this.searchQuery.shippingMtd = this.shippingMtds[0];
        this.searchQuery.destCtry = this.destCtries[0];
        this.searchQuery.fragrance = this.fragrances[0];
    }
    
    dateSelected(e, field) {
        if(field === "from") {
            this.searchQuery.fromDate = Date.parse(e);
        } else {
            this.searchQuery.toDate = Date.parse(e);
        }
        this.fromToDateMismatch = this.checkDateValidity(this.searchQuery.fromDate, this.searchQuery.toDate);
    }

    callSearch() {
        this.searchClick.emit();
    }

    checkDateValidity (from, to) {
        console.log(from, to);
        if(from && to && from > to) {
            return true;
        }
        //returning false by default
        return false;
        
    }
}