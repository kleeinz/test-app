import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditClientPage } from './edit-client/edit-client';
import { ClientModel } from '../../models/client.model';
import { FirebaseClientModel } from '../../models/firebase-client.model';
import { GenericService } from '../../services/generic.service';
import { AuthService } from '../../services/auth.service';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  clients: ClientModel[] = [];
  companySearch:string = '';
  editClientPage = EditClientPage;
  firebaseClients: FirebaseClientModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private genericService: GenericService,
              private authService: AuthService,
              private loggingService: LoggingService) {
  }

  ionViewWillEnter(){
    this.getItems();
  }

  public getItems() {

    this.authService.getActiveUser().getToken()
        .then((token) => {
          this.genericService.getItems(token)
              .subscribe((response: FirebaseClientModel[]) => {
                return (this.firebaseClients = response);
              }, (error) => {
                this.loggingService.error(error);
              })
        });

  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.firebaseClients = this.genericService.filterItems(this.companySearch);
  }

  onRemoveClient(event: FirebaseClientModel) {
    this.authService.getActiveUser().getToken()
        .then((token) => {
          this.genericService.removeItem(token, event.key)
              .subscribe((response) => {
                this.getItems();
              }, (error) => {
                this.loggingService.error(error);
              })
    });

  }

  onUpdateClient(event: FirebaseClientModel) {
    this.navCtrl.push(this.editClientPage, { action: 'Edit', event: event, totalContacts: this.firebaseClients.length });
  }
}
