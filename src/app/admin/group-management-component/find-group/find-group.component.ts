import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../../user/auth.service';
import { IUser } from '../../../user/user';
import { IGroup } from '../../../user/group';
import { Filter2Pipe } from '../../../filter2.pipe';
import { EditGroupComponent } from '../edit-group/edit-group.component';

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
  selector: 'app-find-group',
  templateUrl: './find-group.component.html',
  styleUrls: ['./find-group.component.css']
})
export class FindGroupComponent implements OnInit {
@Output() onGroupEdit = new EventEmitter();
@Output() editGroupClicked = new EventEmitter();
groups: any;
registerForm: FormGroup;
profileForm: FormGroup
group: IGroup;

editGroupWasClicked(){
  this.editGroupClicked.emit();
}

fireEditGroupEvent(groupid, i:any){
  this.onGroupEdit.emit(groupid)
  // console.log(groupid)
}

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  group_name = new FormControl('', [Validators.required]);
  group_description = new FormControl('', [Validators.required]);
  access_list = new FormControl('', [Validators.required]);

  searchViewToggle: boolean = true;
  access_filter = [];


  ngOnInit() {
    this.registerForm = this.fb.group({
      group_name: this.group_name,
      group_description: this.group_description,
      access_list: this.access_list
    });

    this.userService.getGroups().subscribe(data => {
      if (data.success === false) {
        if (data.errcode) {
          //this.authService.logout();
          this.router.navigate(['/userManagement']);
        }
        this.toastr.error(data.message);
      } else {
        this.groups = data.data;
        //this.populateForm(this.user);
        // console.log(data);
      }
    });
  }

  populateForm(e): void {
      this.profileForm.patchValue({
        group_name: e.group_name,
        group_description: e.group_description,
        access_list: e.access_list

      });
    }

  delGroup(groupid): void {
    if (confirm('Are you sure you want to delete this?' )){
      this.userService.delGroup(groupid)
        .subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/groupManagement']);
            console.log(groupid)
            location.reload();
          }
        });
    }
  }

  getUserEdit(groupid): void {
  this.userService.getUser(groupid).subscribe(data => {
    if (data.success === false) {
      if (data.errcode) {
        //this.authService.logout();
        this.router.navigate(['/userManagement']);
      }
      this.toastr.error(data.message);
    } else {
      this.group = data.data;
      //this.populateForm(this.user);
      console.log(this.group);
    }
  });
  }

  accessCheckbox(event){
    if (this.access_filter.includes(event.target.value) ){
      this.access_filter.splice(this.access_filter.indexOf(event.target.value), 1)
    } else {
      this.access_filter.push(event.target.value);
    }
    console.log(this.access_filter);
    console.log(event.target.checked);

  }
//   checked() {
//   return this.group.access_list.filter(groups => { return event.target.checked; });
// }

}
