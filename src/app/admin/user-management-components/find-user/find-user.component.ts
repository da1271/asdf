import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../../user/auth.service';
import { IUser } from '../../../user/user';
import { FilterPipe } from '../../../filter.pipe';
import { EditUserComponent } from '../edit-user/edit-user.component'

import { SearchQuery } from '../../model/searchQuery.model';

function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'mismatchedPassword': true };
}

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.css'],

})
export class FindUserComponent implements OnInit {
@Output() onUserEdit = new EventEmitter();
@Output() editClicked = new EventEmitter();
@Output() searchClick = new EventEmitter();
profileForm: FormGroup
registerForm: FormGroup;
userObj: any;
user: IUser;
users: any;


editWasClicked(){
  this.editClicked.emit();
}
callSearch(){
  this.searchClick.emit();
}

fireEditEvent(userid, i: any){
  this.onUserEdit.emit(userid);
// this.userService.transmitData(userid)
// console.log(userid);
// console.log(e._id);
// this.populateForm(e)
// console.log(i);
}

constructor(private fb: FormBuilder,
            private userService: UserService,
            private authService: AuthService,
            private router: Router,
            private toastr: ToastrService) {
}

firstname = new FormControl('');
lastname = new FormControl('');
email = new FormControl('');
username = new FormControl('');
password = new FormControl('');
retypepass = new FormControl('');
group_name = new FormControl('');

searchViewToggle: boolean = true;

ngOnInit(): void {
    this.userObj =  this.authService.currentUser;
  this.registerForm = this.fb.group({
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    username: this.username,
    passwordGroup: this.fb.group({
      password: this.password,
      retypepass: this.retypepass,
      group_name: this.group_name,

    }, {validator: comparePassword})
  });

  this.userService.getUsers().subscribe(data => {
    if (data.success === false) {
      if (data.errcode) {
        //this.authService.logout();
        this.router.navigate(['/userManagement']);
      }
      this.toastr.error(data.message);
    } else {
      this.users = data.data;
      //this.populateForm(this.user);
      // console.log(data);
    }
  });
}

populateForm(e): void {
  this.profileForm.patchValue({
    firstname: e.firstname,
    lastname: e.lastname,
    email: e.email,
    username: e.username,
    group_name: e.group_name
  });
}

deleteUser(userid): void {
  if (confirm('Are you sure you want to delete this?' )){
    this.userService.deluserDetails(userid)
      .subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.message);
        } else {
          this.toastr.success(data.message);
          this.router.navigate(['/userManagement']);
          location.reload();
        }
      });
  }
}

getUserEdit(userid): void {
this.userService.getUser(userid).subscribe(data => {
  if (data.success === false) {
    if (data.errcode) {
      //this.authService.logout();
      this.router.navigate(['/userManagement']);
    }
    this.toastr.error(data.message);
  } else {
    this.user = data.data;
    //this.populateForm(this.user);
    console.log(this.user);
  }
});
}
}
