import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SigninPage } from '../../../../../pages/signin/signin';

@Component({
  selector: 'page-popover',
  templateUrl: './popover.html'
})
export class PopoverPage {
  signinPage = SigninPage;
  constructor(private viewCtrl: ViewController) {

  }

}
