import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Components
import { MenuHeaderComponent } from './components/shared/menu-header.component';
import { ClientComponent } from './components/client/client.component';

// Pages
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPage } from '../pages/forgot/forgot';
import { ClientsPage } from '../pages/clients/clients';

// Services
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPage,
    MenuHeaderComponent,
    ClientsPage,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPage,
    MenuHeaderComponent,
    ClientsPage,
    ClientComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
