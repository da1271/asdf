import { Component } from '@angular/core';

@Component ({
    selector: 'login-page',
    templateUrl: './login.component.html',
    styles: [`
        header {text-align: center;}
        .subheading{font-size:17px;}
        .login-wrapper { width: 50%; margin: 0 auto; 
            border: 1px solid #000; padding: 50px 100px; font-family: serif;
            margin-bottom: 20px;
            -moz-box-shadow:0px 0px 15px rgba(0, 0, 0, 0.349019607843137);
            -webkit-box-shadow:0px 0px 15px rgba(0, 0, 0, 0.349019607843137);
            box-shadow:0px 0px 15px rgba(0, 0, 0, 0.349019607843137);
        }
        .user-name-tbox label, .pwd-tbox label { display: block;font-size: 15px;
            font-weight: normal;
        }
        .user-name-tbox input, .pwd-tbox input { width: 100%; height:40px;}
        .lost-pwd {text-align: center; font-family: serif;font-size: 15px;font-weight: normal;}
        .login-button-container { margin: 20px 0 0 0;}
        .remember-me label{font-size: 15px;font-weight: normal;}
        .user-name-tbox, .pwd-tbox { padding: 12px 0;}
        .login{ border: 1px solid #000; border-radius: 20px;background: #efefef;
                font-size: 17px;padding: 5px 25px;
        }
    `]
})
export class LoginPageComponent {
    userName:string = "";
    usrpwd:string = "";
    rememberCheck: boolean = false;
    //error messages
    loginNotAvail: boolean = false;
    loginfailed: boolean = false;

    // validate and call user login service
    userLogin() {
        //remove error before submitting form
        this.loginfailed = false;
        if(this.userName && this.usrpwd) {
            console.log("Call user service");
            //login failed:
            this.loginfailed = true;
        } else {
            console.log("validation error message")
            this.loginNotAvail = true;
        }
    }
}