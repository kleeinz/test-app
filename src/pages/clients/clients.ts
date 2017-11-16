import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
              private sharedService: SharedService,
              private alertController: AlertController) {

                this.sharedService.componentMethodCalled.subscribe(
                    () => {
                      this.firebaseClients = [];
                      this.getItems();
                });
  }

  public ngOnInit() {
    this.firebaseClients = [];
    this.getItems();
  }

  getItems() {
    this.authService.getActiveUser().getToken()
        .then((token) => {
          this.genericService.getItems(token)
              .subscribe((response: FirebaseClientModel[]) => {
                this.firebaseClients = response;
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

  onCompanySearch(event: string) {
    this.firebaseClients = this.genericService.filterItems(event);
  }

  onConfirmDelete(event: FirebaseClientModel) {
    let alert = this.alertController.create({
    title: 'Are you sure?',
    message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.onRemoveClient(event);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
