import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private passwordType: string = "password";
  private passwordIcon: string = "eye-off-outline";

  constructor() {}

  ngOnInit() {}

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off-outline" ? "eye-outline" : "eye-off-outline";
  }
}
