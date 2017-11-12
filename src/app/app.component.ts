import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { ClientsPage } from '../pages/clients/clients';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ClientsPage;
  clientsPage = ClientsPage;
  // rootPage:any = ClientsPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyCx7oTapDY2FubRwmP9zK9CTY5YO6pnmNA",
      authDomain: "test-app-d61e5.firebaseapp.com"
    });
    // firebase.auth().onAuthStateChanged(user => {
    //   if(user) {
    //     this.isAuthenticated = true;
    //     this.nav.setRoot(ClientsPage);
    //   } else {
    //     this.isAuthenticated = false;
    //     this.nav.setRoot(SigninPage);
    //   }
    // });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
