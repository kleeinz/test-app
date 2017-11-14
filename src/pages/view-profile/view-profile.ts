import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  totalContacts:number = 0;
  username:string = 'Username';
  creationDate:string = 'Mon, 13 Nov 1992 22:04:10 GMT';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertController: AlertController,
              private authService: AuthService) {

  }

  ionViewDidLoad() {
    this.totalContacts = this.navParams.get('totalContacts');
    this.username = this.navParams.get('username');
    this.creationDate = this.navParams.get('creationDate');
  }

  onChangePassword() {
    let alert = this.alertController.create({
      title: 'Change Password',
      inputs:[
        {
          name: 'current',
          placeholder: 'Current Password'
        },
        {
          name: 'newPass',
          placeholder: 'New Password'
        }
      ],
      buttons: [
        {
          text: 'Change',
          handler: (data) => {
            console.log(data);
            this.authService.updatePassword(data.current, data.newPass)
                .then(() => {
                  console.log('success')
                }, (error) => {
                  console.log(error);
                });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present().then(()=> {
      const firstInput: any = document.querySelector('ion-alert input');
	    firstInput.focus();
	    return;
    });
  }

}
