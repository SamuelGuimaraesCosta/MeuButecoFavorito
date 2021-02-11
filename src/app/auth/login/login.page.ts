import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
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
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
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
      this.messageService.loadMessage("circles", null, "Efetuando login...", true, true).then((loaded) => {
        this.authService.login(this.loginForm.value).subscribe(
          res => {
            this.messageService.dismissLoadMessage(false).then(() => {
              this.messageService.toastMessage("Login efetuado com sucesso!", null, "top", [], "success", 2000).then(() => {
                this.router.navigate(['/home']);
              });
            });
          },
          err => {
            if (err.code == 404) {
              this.messageService.dismissLoadMessage(false).then(() => {
                this.messageService.toastMessage("Usuário não encontrado!", "O E-Mail/Senha informados não estão corretos, ou você ainda não criou uma conta.", "top", [], "warning", 10000);
              });
            } else if (err.code == 401) {
              this.messageService.dismissLoadMessage(false).then(() => {
                this.messageService.toastMessage("Usuário ou senha inválidos!", null, "top", [], "warning", 5000);
              });
            } else if(err.code == 999) {
              this.messageService.dismissLoadMessage(false).then(() => {
                this.messageService.toastMessage("Conta desativada!", "Entre em contato com o suporte para re-ativar sua conta!", "top", [], "warning", 5000);
              });
            } else if(err.code == 998) {
              this.messageService.dismissLoadMessage(false).then(() => {
                this.messageService.toastMessage("Ops!", "Sua conta foi bloqueada permanentemente!", "top", [], "danger", 3000);
              });
            } else {
              this.messageService.dismissLoadMessage(false).then(() => {
                this.messageService.toastMessage("Ops! Houve algum erro:", err.error + "<br>Código do erro: " + err.code + "<br>Contate o suporte para solucionarmos o seu problema!", "top", [], "danger", 5000);
              });
            }
          },
          () => {
            //requisição completa
            this.messageService.dismissLoadMessage(false);
          }
        );
      });
    } else {
      this.messageService.toastMessage("Preencha todos os dados corretamente!", null, "top", [], "danger", 3000);
    }
  }
}
