import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import { ClientsPage } from '../clients/clients';

import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  signupPage = SignupPage;
  forgotPage = ForgotPage;
  clientsPage = ClientsPage;
  /*
      apiKey: "AIzaSyCx7oTapDY2FubRwmP9zK9CTY5YO6pnmNA",
      authDomain: "test-app-d61e5.firebaseapp.com",
  */
  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController) {

  }

  public onLogin(lf: NgForm) {
    const loading = this.loadingController.create({
      content: 'Logging in the application...'
    });
    loading.present();
    this.authService.signin(lf.value.email, lf.value.password)
      .then((data)=> {
        loading.dismiss();
        this.navCtrl.setRoot(this.clientsPage);
      })
      .catch((error) => {
        loading.dismiss();
        const alert = this.alertController.create({
          title: 'Signin Failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
