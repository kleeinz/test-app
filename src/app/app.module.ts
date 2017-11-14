import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

// Components
import { MenuHeaderComponent } from './components/shared/menu-header/menu-header.component';
import { ClientComponent } from './components/client/client.component';

// Directives
import { PasswordValidatorDirective } from './directives/password-validator/password-validator.directive';

// Pages
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPage } from '../pages/forgot/forgot';
import { ClientsPage } from '../pages/clients/clients';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { EditClientPage } from '../pages/clients/edit-client/edit-client';
import { PopoverPage } from './components/shared/menu-header/popover/popover';

// Services
import { AuthService } from '../services/auth.service';
import { GenericService } from '../services/generic.service';
import { LoggingService } from '../services/logging.service';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPage,
    MenuHeaderComponent,
    ClientsPage,
    EditClientPage,
    ClientComponent,
    PopoverPage,
    ViewProfilePage,
    PasswordValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText:''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPage,
    MenuHeaderComponent,
    ClientsPage,
    EditClientPage,
    ClientComponent,
    PopoverPage,
    ViewProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    GenericService,
    LoggingService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
