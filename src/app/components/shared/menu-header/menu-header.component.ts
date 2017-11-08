import { Component, Input } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { EditClientPage } from '../../../../pages/clients/edit-client/edit-client';
import { PopoverPage } from './popover/popover';

@Component({
  selector: 'menu-header',
  templateUrl: './menu-header.component.html'
})
export class MenuHeaderComponent {
  @Input() title: string;

  constructor(private navCtrl: NavController, private popoverController: PopoverController) {

  }

  onAddClient(){
    this.navCtrl.push(EditClientPage, {action: 'New'});
  }

  onShowPopover(event: MouseEvent) {
    const popover = this.popoverController.create(PopoverPage);
    popover.present({ev: event});
  }
}
