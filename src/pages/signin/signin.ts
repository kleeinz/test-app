import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import { ClientsPage } from '../clients/clients';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  signupPage = SignupPage;
  forgotPage = ForgotPage;
  clientsPage = ClientsPage;

  constructor(public navCtrl: NavController) {

  }

}
