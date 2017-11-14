import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { GenericService } from '../../../services/generic.service';
import { LoggingService } from '../../../services/logging.service';
import { AuthService } from '../../../services/auth.service';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector:'page-edit-client',
  templateUrl: 'edit-client.html'
})
export class EditClientPage implements OnInit {
  private action:string = 'New';
  private totalContacts: number = 0;
  private selectGender = ['Male', 'Female'];
  clientForm: FormGroup;
  private data: any;
  private client: ClientModel;
  private index: number;
  private isDisabled: boolean = false;

  constructor(private navParams: NavParams,
      private genericService: GenericService,
      private navController: NavController,
      private authService: AuthService,
      private loggingService: LoggingService,
      private loadingController: LoadingController,
      private alertController: AlertController) {

  }

  public ngOnInit(){
    this.action = this.navParams.get('action');
    this.isDisabled = this.navParams.get('isDisabled');
    this.totalContacts = this.navParams.get('totalContacts');
    this.data = this.navParams.get('event');

    if (this.action === 'Edit' || this.action === 'Look') {
      this.client = this.data.client;
      this.index = this.data.index;
    }
    this.initializeForm();
  }

  private initializeForm() {
    console.log(this.action)
    let company = null;
    let fullname = null;
    let gender = 'Male';
    let email = null;
    let phone = null;

    if(this.action === 'Edit' || this.action === 'Look') {
      company = this.client.company;
      fullname = this.client.fullname;
      gender = this.client.gender
      email = this.client.email;
      phone = this.client.phone;
    }

    this.clientForm = new FormGroup({
      'company': new FormControl({value: company, disabled: this.isDisabled}, Validators.required),
      'fullname': new FormControl({value: fullname, disabled: this.isDisabled}, Validators.required),
      'gender': new FormControl({value: gender, disabled: this.isDisabled}, Validators.required),
      'email': new FormControl({value: email, disabled: this.isDisabled}, Validators.required),
      'phone': new FormControl({value: phone, disabled: this.isDisabled}, Validators.required)
    });
  }

  onAddClient() {
    const value = this.clientForm.value;
    const loading = this.loadingController.create({
      content: 'Doing changes to clients...'
    });
    loading.present();
    const updateClient = new ClientModel(value.company, value.fullname, value.gender, value.email, value.phone);
    if (this.action === 'Edit') {
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
              this.genericService.updateItem(token, this.data.key, updateClient)
                  .subscribe(() => {
                    loading.dismiss();
                    this.navController.popToRoot();
                  }, error => {
                    loading.dismiss();
                    const alert = this.alertController.create({
                      title: 'Operation failed!',
                      message: error,
                      buttons: ['Ok']
                    });
                    alert.present();

                  });
          });
    } else {
      this.authService.getActiveUser().getToken()
          .then((token: string) => {
              this.genericService.addItem(token,
                  new ClientModel(value.company, value.fullname, value.gender, value.email, value.phone))
                  .subscribe(
                    () =>{
                      loading.dismiss();
                      this.navController.popToRoot();
                    },
                    error => {
                      loading.dismiss();
                      const alert = this.alertController.create({
                        title: 'Operation failed!',
                        message: error,
                        buttons: ['Ok']
                      });
                      alert.present();
                    }
                  )
          });
    }
  }

}
