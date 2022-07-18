import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  show() {
    if (!this.loading) {
      this.loadingCtrl.create({ spinner: 'circles'}).then(res => {
        this.loading = res;
        this.loading.present();
      })
    }

  }
  hide() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  // showToast(message) {
  //   this.toastCtrl.create({ message: message, duration: 3000 }).then(r => r.present())
  // }
   showSuccess(message: string) {
    
    // Stop multiple toasts 
    try {
      this.toastCtrl.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}
    
    this.toastCtrl.create({
      message: message,
      position: 'top',
      cssClass: 'toast-custom-class',
      duration: 2000 
    }).then((toast) => {
      toast.present();
    });
  }

  showFailure(message: string) {
    
    // Stop multiple toasts 
    try {
      this.toastCtrl.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}
    
    this.toastCtrl.create({
      message: message,
      position: 'top',
      cssClass: 'toast-custom-class-failure',
      duration: 2000 
    }).then((toast) => {
      toast.present();
    });
  }
}

