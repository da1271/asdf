import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDatepickerModule, MdInputModule, MdNativeDateModule} from '@angular/material';

import { SearchPageComponent } from './search.component';
import { OrderSearchComponent } from './order-search.component';
import { DetailViewComponent } from './detail-view.component';
import { QuickFilterComponent } from './quick-filter.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MdDatepickerModule,
        MdInputModule,
        MdNativeDateModule
    ],
    declarations: [
        SearchPageComponent,
        OrderSearchComponent,
        DetailViewComponent,
        QuickFilterComponent
    ],
    exports: [SearchPageComponent]
})

export class SearchModule{}