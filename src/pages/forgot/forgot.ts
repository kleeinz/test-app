import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController) {
  }


  public onForgot(forgotForm: NgForm) {
    const loading = this.loadingController.create({
      content: 'Sending an email to ' + forgotForm.value.email + '...'
    });
    loading.present();
    this.authService.getUserByEmail(forgotForm.value.email).then(() => {
      loading.dismiss();
      this.navCtrl.popToRoot();
    }, (error) => {
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Email not found',
        message: error,
        buttons: ['Ok']
      });
      alert.present();
    });
  }

}
