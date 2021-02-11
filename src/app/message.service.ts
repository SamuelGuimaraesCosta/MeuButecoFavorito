import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async toastMessage(
    header: string, 
    message: string, 
    position: "top" | "bottom" | "middle", 
    buttons: [], 
    color: string, 
    duration: number
  ) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: position,
      buttons: buttons,
      color: color,
      duration: duration
    });
    toast.present();
  }

  async loadMessage(
    spinner: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small", 
    duration: number, 
    message: string, 
    translucent: boolean, 
    backdropDismiss: boolean
  ) {
    const loading = await this.loadingController.create({
      spinner: spinner,
      duration: duration,
      message: message,
      translucent: translucent,
      backdropDismiss: backdropDismiss
    });
    return await loading.present().then(() => {
      return true;
    }).catch(error => {
      return error;
    });
  }

  async dismissLoadMessage(loadingVerify: boolean) {
    if(!loadingVerify)
      return this.loadingController.dismiss();
    return;
  }
}
