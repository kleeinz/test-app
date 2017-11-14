import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, LoadingController } from 'ionic-angular';
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
              private loggingService: LoggingService,
              private loadingController: LoadingController) {
      this.totalContacts = this.navParams.get('totalContacts');
  }

  onLogout() {
    const loading = this.loadingController.create({
      content: 'Exiting from the application...'
    });
    loading.present();
    this.authService.logout();
    loading.dismiss();
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
