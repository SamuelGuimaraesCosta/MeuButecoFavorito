import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { MessageService } from 'src/app/message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public anoMaximo;

  public dadosUsuario: User = {
    NOME: "Carregando...",
    IDUSUARIO: 0,
    EMAIL: "Carregando...",
    SENHA: "Carregando...",
    DTNASCIMENTO: moment().format("YYYY-MM-DD")
  };

  public podeSalvar: boolean = false;

  private novosDados = {
    NOME: "",
    DTNASCIMENTO: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private storage: Storage
  ) {
    this.anoMaximo = new Date();
    this.anoMaximo = this.anoMaximo.getFullYear() - 18;

    this.storage.get("USER_INFO").then((response: User) => {
      if (response) {
        this.dadosUsuario = response;
      } else {
        this.logOutApp();
      }
    }).catch((error) => {
      this.logOutApp();
    });
  }

  carregaDadosUsuario() {
    this.storage.get("USER_INFO").then((response: User) => {
      if (response) {
        this.dadosUsuario = response;
      } else {
        this.logOutApp();
      }
    }).catch((error) => {
      this.logOutApp();
    });
  }

  ionViewWillEnter() {
    console.log("carregar dados da página profile!");
  }

  ngOnInit() { }

  logOutApp() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/start', { replaceUrl: true });
    }).catch(() => {
      this.messageService.toastMessage("Houve algum erro ao tentar desconectar-se!", null, "top", null, "warning", 3000);
    });
  }

  changeFieldNome(value) {
    if (value != this.dadosUsuario.NOME && verificaValor(value)) {
      this.podeSalvar = true;
      this.novosDados.NOME = value;
    } else {
      this.podeSalvar = false;
    }
  }

  salvaNovosDados() {
    console.log(this.novosDados);
  }
}

function verificaValor(value) {
  console.log(value);
  if (value.length > 3) {
    if (value != null) {
      if (value != "" || value != " ") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
