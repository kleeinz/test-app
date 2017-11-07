import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditClientPage } from '../../../../pages/clients/edit-client/edit-client';

@Component({
  selector: 'menu-header',
  templateUrl: './menu-header.component.html'
})
export class MenuHeaderComponent {
  @Input() title: string;

  constructor(private navCtrl: NavController) {

  }

  onAddClient(){
    this.navCtrl.push(EditClientPage, {action: 'New'});
  }
}
