import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { GenericService } from '../../../services/generic.service';
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
  private clients: ClientModel[] = [];

  constructor(private navParams: NavParams,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private genericService: GenericService,
      private navController: NavController) {

  }

  public ngOnInit(){
    this.action = this.navParams.get('action');
    this.totalContacts = this.navParams.get('totalContacts');
    this.initializeForm();
  }

  private initializeForm() {
    this.clientForm = new FormGroup({
      'company': new FormControl(null, Validators.required),
      'fullname': new FormControl(null, Validators.required),
      'gender': new FormControl('Male', Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required)
    });
  }

  onAddClient() {
    const value = this.clientForm.value;
    this.genericService.addItem(value.company, value.fullname, value.gender, value.email, value.phone);
    this.navController.popToRoot();
  }

}
