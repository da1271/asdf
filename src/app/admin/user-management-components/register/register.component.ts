import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr.service';
import { UserService } from '../../../user/user.service';

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
selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) {
  }

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]);
  password = new FormControl('', [Validators.required]);
  retypepass = new FormControl('', [Validators.required]);
  group_name = new FormControl('', [Validators.required]);

searchViewToggle: boolean = true;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      group_name: this.group_name,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,


      }, {validator: comparePassword})
    });
  }

  registerUser(formdata: any): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      const theForm = this.registerForm.value;
      const thePass = this.registerForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;

      this.userService.register(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/userManagement']);
            location.reload();
          }
          this.registerForm.reset();
        });
    }
  }
}
