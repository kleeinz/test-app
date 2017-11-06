import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

// Components
import { MenuHeaderComponent } from './components/shared/menu-header/menu-header.component';
import { MenuContentComponent } from './components/shared/menu-content/menu-content.component';
import { ClientComponent } from './components/client/client.component';

// Pages
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPage } from '../pages/forgot/forgot';
import { ClientsPage } from '../pages/clients/clients';
import { EditClientPage } from '../pages/clients/edit-client/edit-client';

// Services
import { AuthService } from '../services/auth.service';
import { GenericService } from '../services/generic.service';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPage,
    MenuHeaderComponent,
    MenuContentComponent,
    ClientsPage,
    EditClientPage,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPage,
    MenuHeaderComponent,
    MenuContentComponent,
    ClientsPage,
    EditClientPage,
    ClientComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    GenericService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
