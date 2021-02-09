import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private passwordType: string = "password";
  private passwordIcon: string = "eye-off-outline";

  public loginForm: FormGroup;
  private submitted: boolean = false;
  private triesNumber: number = 0;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])]
    });
  }

  ngOnInit() { }

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off-outline" ? "eye-outline" : "eye-off-outline";

    setTimeout(() => {
      this.passwordType = "password";
      this.passwordIcon = "eye-off-outline";
    }, 1000);
  }

  get errorCtr() {
    return this.loginForm.controls;
  }

  doLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      //console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(res => {
        console.log(res);
      }), error => {
        console.log(error);
      }
    } else {
      return false;
    }
  }
}
