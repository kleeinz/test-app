import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  totalContacts:number = 0;
  username:string = 'Username';
  creationDate:string = 'Mon, 13 Nov 1992 22:04:10 GMT';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.totalContacts = this.navParams.get('totalContacts');
    this.username = this.navParams.get('username');
    this.creationDate = this.navParams.get('creationDate');
  }

}
