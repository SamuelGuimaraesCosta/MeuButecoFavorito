import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  
  private passwordType: string = "password";
  private passwordIcon: string = "eye-off-outline";

  public registerForm: FormGroup;
  private submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.registerForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.maxLength(70), Validators.minLength(2), Validators.required])],
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
    return this.registerForm.controls;
  }

  doRegister() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        res => {
          console.log("Response: ", res)
        },
        err => {
          this.messageService.toastMessage("Ops! Houve algum erro:", err.error + "<br>Código do erro: " + err.code + "<br>Contate o suporte para solucionarmos o seu problema!", "top", [], "danger", 5000);
        },
        ()  => {
          console.log("Requisição completa!")
        }
      );
    } else {
      return false;
    }
  }

}
