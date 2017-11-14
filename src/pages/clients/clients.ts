import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EditClientPage } from './edit-client/edit-client';
import { ClientModel } from '../../models/client.model';
import { FirebaseClientModel } from '../../models/firebase-client.model';
import { GenericService } from '../../services/generic.service';
import { AuthService } from '../../services/auth.service';
import { LoggingService } from '../../services/logging.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage implements OnInit {
  clients: ClientModel[] = [];
  companySearch:string = '';
  editClientPage = EditClientPage;
  firebaseClients: FirebaseClientModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private genericService: GenericService,
              private authService: AuthService,
              private loggingService: LoggingService,
              private loadingController: LoadingController,
              private sharedService: SharedService) {

                this.sharedService.componentMethodCalled.subscribe(
                    () => {
                      this.firebaseClients = [];
                      this.getItems();
                }
);
  }

  public ngOnInit() {
    this.firebaseClients = [];
    this.getItems();
  }

  ionViewWillEnter(){

  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.firebaseClients = this.genericService.filterItems(this.companySearch);
  }

  getItems() {
    const loading = this.loadingController.create({
      content: 'Loading information...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
        .then((token) => {
          this.genericService.getItems(token)
              .subscribe((response: FirebaseClientModel[]) => {
                this.firebaseClients = response;
                loading.dismiss();
                return this.firebaseClients;
              }, (error) => {
                this.loggingService.error(error);
              })
        });
  }

  onLookClient(event: FirebaseClientModel) {
    this.navCtrl.push(this.editClientPage, { action: 'Look', event: event, totalContacts: this.firebaseClients.length, isDisabled: true });
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
