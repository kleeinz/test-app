import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { SigninPage } from '../../../../../pages/signin/signin';
import { ViewProfilePage } from '../../../../../pages/view-profile/view-profile';
import { AuthService } from '../../../../../services/auth.service';
import { LoggingService } from '../../../../../services/logging.service';

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
              private navController: NavController,
              private authService: AuthService,
              private loggingService: LoggingService) {
      this.totalContacts = this.navParams.get('totalContacts');
      // loggingService.info("totalContacts: " + this.totalContacts);
  }

  onLogout() {
    // this.navController.push(this.signinPage);
    // this.navController.setRoot(this.signinPage);
    this.authService.logout();
    this.viewCtrl.dismiss();
  }

  onGoProfilePage() {
    let firebaseUser = this.authService.getActiveUser();
    this.navController.push(this.viewProfilePage, {
        username: firebaseUser.email,
        totalContacts: this.totalContacts,
        creationDate: firebaseUser.metadata.creationTime });
    this.viewCtrl.dismiss();
  }

}
