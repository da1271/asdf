import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr.service';
import { UserService } from '../../../user/user.service';
declare const jQuery:  any;

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
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {


  registerForm: FormGroup;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) {
  }

  group_name = new FormControl('', [Validators.required]);
  group_description = new FormControl('', [Validators.required]);
  access_list = new FormControl('', [Validators.required]);


  searchViewToggle: boolean = true;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      group_name: this.group_name,
      group_description: this.group_description,
      access_list: this.access_list
    });
  }



  registerGroup(formdata: any): void {
let access_list = [];

let checkboxes = [
(<HTMLInputElement>document.getElementById("test")),
(<HTMLInputElement>document.getElementById("test2")),
(<HTMLInputElement>document.getElementById("test3")),
(<HTMLInputElement>document.getElementById("test4")),
(<HTMLInputElement>document.getElementById("test5")),
(<HTMLInputElement>document.getElementById("test6")),
(<HTMLInputElement>document.getElementById("test7")),
(<HTMLInputElement>document.getElementById("test8")),
(<HTMLInputElement>document.getElementById("test9")),
(<HTMLInputElement>document.getElementById("test10"))
]


console.log(this.access_list)
for (var i = 0; i < checkboxes.length; i++){
  if (checkboxes[i].checked){
    access_list.push(checkboxes[i].value)
  }
} console.log(access_list)


    if (this.registerForm.dirty && this.registerForm.valid) {

      const theForm = this.registerForm.value;
      theForm.access_list = access_list;
      console.log(theForm)

      this.userService.registerGroup(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/groupManagement']);
            location.reload();
            console.log(data)
          }
          this.registerForm.reset();
        });
    }
  }

}
