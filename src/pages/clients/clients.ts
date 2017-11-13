import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditClientPage } from './edit-client/edit-client';
import { ClientModel } from '../../models/client.model';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private genericService: GenericService,
              private authService: AuthService,
              private loggingService: LoggingService) {
  }

  ionViewWillEnter(){
    this.getItems();
  //  this.clients = this.genericService.getItems();
  }

  private getItems() {
    this.authService.getActiveUser().getToken()
        .then((token) => {
          this.genericService.getItems2(token)
              .subscribe((clientList: ClientModel[]) => {
                this.loggingService.info('Getting data');
                if(clientList) {


                } else {
                
                  this.clients = [];
                }
              }, (error) => {
                this.loggingService.error(error);
              })
        });
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.clients = this.genericService.filterItems(this.companySearch);
  }

  onRemoveClient(client: ClientModel) {
    this.genericService.removeItem(client.email);
    //this.clients = this.genericService.getItems();
    this.getItems();
  }

  onUpdateClient(event: {index:number, client:ClientModel}) {
    console.log("event: ", event);
    this.navCtrl.push(this.editClientPage, { action: 'Edit', event: event, totalContacts: this.clients.length });
  }
}
