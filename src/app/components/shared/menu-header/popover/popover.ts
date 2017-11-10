import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { SigninPage } from '../../../../../pages/signin/signin';
import { ViewProfilePage } from '../../../../../pages/view-profile/view-profile';

@Component({
  selector: 'page-popover',
  templateUrl: './popover.html'
})
export class PopoverPage {

  signinPage = SigninPage;
  viewProfilePage = ViewProfilePage;
  totalContacts:number = 0;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private navController: NavController) {
      this.totalContacts = this.navParams.get('totalContacts');
      console.log("totalContacts: ", this.totalContacts);
  }

  onLogout() {
    this.navController.push(this.signinPage);
    this.navController.setRoot(this.signinPage);
  }

}
