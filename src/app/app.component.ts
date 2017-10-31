import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { ClientsPage } from '../pages/clients/clients';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = SigninPage;
  rootPage:any = ClientsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyCx7oTapDY2FubRwmP9zK9CTY5YO6pnmNA",
      authDomain: "test-app-d61e5.firebaseapp.com"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
