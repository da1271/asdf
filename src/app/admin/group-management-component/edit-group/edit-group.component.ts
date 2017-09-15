import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../../user/auth.service';
import { IUser } from '../../../user/user';
import { IGroup } from '../../../user/group';
// import { FindGroupComponent } from '../find-group/find-group.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  @Input() groupid: string;

  @Output() cancelGroupClicked = new EventEmitter();

  ngOnChanges(change) {
    this.getGroupEdit();
    // this.getUserEdit();
  }

  profileForm: FormGroup
  userObj: any;
  group: IGroup;
  data: any;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              // private FindUserComponent: FindUserComponent,
              private router: Router,
              private toastr: ToastrService) {
  }

  group_name = new FormControl('', [Validators.required]);
  group_description = new FormControl('', [Validators.required]);
  access_list = new FormControl('', [Validators.required]);

  searchViewToggle: boolean = true;


  ngOnInit(): void {
    function populateFormInIt(groupid) {
    let access = [];

    let checkboxes = [
    (<HTMLInputElement>document.getElementById("test1")),
    (<HTMLInputElement>document.getElementById("test12")),
    (<HTMLInputElement>document.getElementById("test13")),
    (<HTMLInputElement>document.getElementById("test14")),
    (<HTMLInputElement>document.getElementById("test15")),
    (<HTMLInputElement>document.getElementById("test16")),
    (<HTMLInputElement>document.getElementById("test17")),
    (<HTMLInputElement>document.getElementById("test18")),
    (<HTMLInputElement>document.getElementById("test19")),
    (<HTMLInputElement>document.getElementById("test110")),
    ]

      // console.log(<HTMLInputElement>document.getElementById("test1"))
    // console.log(<HTMLInputElement>document.getElementById("test"))
    for (var i = 0; i < checkboxes.length; i++){
      if (checkboxes[i].checked){
        access.push(checkboxes[i].value)
      }
    }
    console.log(checkboxes[0].checked)
  }


    this.userObj =  this.authService.currentUser;


    let tmp = this.fb.group({
      Reporting: new FormControl(false),
      CSC_Label_Approval: new FormControl(false),
      CSC_Manager_Label_Approval: new FormControl(false),
      Inventory_Management: new FormControl(false),
      Label_Print: new FormControl(false),
      Quality_Control: new FormControl(false),
      Shipping: new FormControl(false),
      Order_Management: new FormControl(false),
      User_Management: new FormControl(false),
      Group_Management: new FormControl(false),
    });


    this.profileForm = this.fb.group({
      group_name: this.group_name,
      group_description: this.group_description,
      access_list: tmp
    }); console.log(this.access_list)

  }


  populateGroup(): void{
    this.group = this.userService.transmitData2(this.data);
    // this.userService.transmitData(user).then(user => this.user = user)

    // console.log(this.group)
  }

  populateForm(data): void {

      let tmp = this.fb.group({
        Reporting: new FormControl(false),
        CSC_Label_Approval: new FormControl(false),
        CSC_Manager_Label_Approval: new FormControl(false),
        Inventory_Management: new FormControl(false),
        Label_Print: new FormControl(false),
        Quality_Control: new FormControl(false),
        Shipping: new FormControl(false),
        Order_Management: new FormControl(false),
        User_Management: new FormControl(false),
        Group_Management: new FormControl(false),
      });

      for (let av of data.access_list) {

        tmp.controls[av].setValue(true);
      }

      // this.profileForm.patchValue({
      //   group_name: data.group_name,
      //   group_description: data.group_description,
      //   access_list: data.access_list
      // });
      console.log(data)
      this.profileForm = this.fb.group({
        group_name: data.group_name,
        group_description: data.group_description,
        access_list: tmp
      });
    }

    updateGroup(groupid): void {
      let access = [];

      let checkboxes = [
      (<HTMLInputElement>document.getElementById("test1")),
      (<HTMLInputElement>document.getElementById("test12")),
      (<HTMLInputElement>document.getElementById("test13")),
      (<HTMLInputElement>document.getElementById("test14")),
      (<HTMLInputElement>document.getElementById("test15")),
      (<HTMLInputElement>document.getElementById("test16")),
      (<HTMLInputElement>document.getElementById("test17")),
      (<HTMLInputElement>document.getElementById("test18")),
      (<HTMLInputElement>document.getElementById("test19")),
      (<HTMLInputElement>document.getElementById("test110")),
      ]

        // console.log(<HTMLInputElement>document.getElementById("test1"))
      // console.log(<HTMLInputElement>document.getElementById("test"))
      for (var i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
          access.push(checkboxes[i].value)
        }
      }
      console.log(checkboxes[0].checked)  //use renuka's advice and make everything into a for loop.
      if (this.profileForm.dirty && this.profileForm.valid) {

        const theForm = this.profileForm.value;
        theForm.access_list = access;
        console.log(theForm)
        console.log(checkboxes[0].checked)

        this.userService.updateGroup(this.groupid, theForm) //this.userid
          .subscribe(data => {
            if (data.success === false) {
              if (data.errcode){
                this.authService.logout();
                this.router.navigate(['groupManagement']);
              }
              this.toastr.error(data.message);
            } else {
              this.toastr.success(data.message);
              location.reload();
              // const theUser: any = JSON.parse(localStorage.getItem('currentUser')); //'currentUser' must be something else
              // theUser.user.firstname = this.profileForm.value.firstname;
              // localStorage.setItem('currentUser', JSON.stringify(theUser));   //same as above
            }
          });
      }
    }

    getGroupEdit(): void {
      let checkboxes = [
      (<HTMLInputElement>document.getElementById("test1")),
      (<HTMLInputElement>document.getElementById("test12")),
      (<HTMLInputElement>document.getElementById("test13")),
      (<HTMLInputElement>document.getElementById("test14")),
      (<HTMLInputElement>document.getElementById("test15")),
      (<HTMLInputElement>document.getElementById("test16")),
      (<HTMLInputElement>document.getElementById("test17")),
      (<HTMLInputElement>document.getElementById("test18")),
      (<HTMLInputElement>document.getElementById("test19")),
      (<HTMLInputElement>document.getElementById("test110")),
      ]

      this.userService.getGroup(this.groupid).subscribe(data => {

        if (data.success === false) {
          if (data.errcode) {
            //this.authService.logout();
            this.router.navigate(['/groupManagement']);
          }
          this.toastr.error(data.message);
        } else {
          this.group = data.data;
          this.populateForm(this.group[0]);

        }

      });
      // console.log(this.groupid);
      // console.log(checkboxes[0].checked)

    }

    cancelGroupWasClicked(){
      this.cancelGroupClicked.emit();
    }
}
