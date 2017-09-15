import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'detail-view',
    templateUrl: './detail-view.component.html',
    styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
    @Input() customerDetails;
    @Output() closeDetails = new EventEmitter();

    constructor(private http: HttpClient) {}

    labelImageurl: string;
    rejectionProps: object = {};

    rejectCodes: string[] = ["Copyright", "Abusive/Defamatory", "Inappropriate", "Unsuitable", "Brand misuse", "Others"];

    ngOnInit () {
        this.labelImageurl="assets/images/label_image.jpg";
    }

    closeSection () {
        this.closeDetails.emit();
    }

    rejectOrder() {
        console.log("Reject order functionality");
    }

    holdOrder() {
        console.log("Hold order functionality");
    }
    approveOrder() {
        console.log("Approve order functionality");
        const postParams = {
            orderId: "123abc",
            orderStatus: "approved",
            user: "dave"
        }
        this.http.post('/api/orderstatus/12345/hold', postParams)
        .subscribe(
        // Success
            data => console.log(data),
        // Error
            err => console.log(err) 
        )
    }
}