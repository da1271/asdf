import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../../user/auth.service';
import { IUser } from '../../../user/user';
import { FindUserComponent } from '../find-user/find-user.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Output() cancelClicked = new EventEmitter();

  @Input() userid: string;

  ngOnChanges(change) {
    this.getUserEdit();
  }

  profileForm: FormGroup
  userObj: any;
  user: IUser;
  data: any;
  // fireEditEvent(e, i: any){
  //   console.log(e.username);
  //   console.log(e._id);
  //   // this.populateForm(e)
  //   // console.log(i);
  // }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              // private FindUserComponent: FindUserComponent,
              private router: Router,
              private toastr: ToastrService) {
  }

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  username = new FormControl('', [Validators.required]);
  group_name = new FormControl('', [Validators.required]);

  searchViewToggle: boolean = true;

  ngOnInit() {
    this.userObj =  this.authService.currentUser;
    this.profileForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      group_name: this.group_name
    });


  }


  populateUser(): void{
    this.user = this.userService.transmitData(this.data);
    // this.userService.transmitData(user).then(user => this.user = user)

    console.log(this.user)
  }

populateForm(data): void {
    this.profileForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      username: data.username,
      group_name: data.group_name
    });
  }

  updateUser(userid): void {
    // console.log(formdata)
    if (this.profileForm.dirty && this.profileForm.valid) {
      this.userService.updateUser(this.userid, this.profileForm.value) //this.userid
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode){
              this.authService.logout();
              this.router.navigate(['userManagement']);
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

  getUserEdit(): void {
    this.userService.getUser(this.userid).subscribe(data => {

      if (data.success === false) {
        if (data.errcode) {
          //this.authService.logout();
          this.router.navigate(['/userManagement']);
        }
        this.toastr.error(data.message);
      } else {
        this.user = data.data;
        this.populateForm(this.user[0]);

      }

    });
    console.log(this.username);

  }

  cancelWasClicked(){
    this.cancelClicked.emit();
  }

}
