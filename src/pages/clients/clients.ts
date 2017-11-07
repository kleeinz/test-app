import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditClientPage } from './edit-client/edit-client';
import { ClientModel } from '../../models/client.model';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  clients: ClientModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public genericService: GenericService) {
  }

  ionViewWillEnter(){
    this.clients = this.genericService.getItems();
  }

  onRemoveClient(client: ClientModel) {
    this.genericService.removeItem(client.email);
    this.clients = this.genericService.getItems();
  }

}
