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
  @Input() showContacts: boolean = false;
  @Input() showAddButton: boolean = false;
  @Input() showSettingsButton: boolean = false;
  @Input() totalContacts: number = 0;

  constructor(private navCtrl: NavController, private popoverController: PopoverController) {

  }

  onAddClient(){
    this.navCtrl.push(EditClientPage, { action: 'New', totalContacts: this.totalContacts });
  }

  onShowPopover(event: MouseEvent) {
    const popover = this.popoverController.create(PopoverPage, { totalContacts: this.totalContacts });
    popover.present({ ev: event });
  }
}
