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
  // private clients: ClientModel[] = [];
  private data: any;
  private client: ClientModel;
  private index: number;

  constructor(private navParams: NavParams,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private genericService: GenericService,
      private navController: NavController) {

  }

  public ngOnInit(){
    this.action = this.navParams.get('action');
    this.totalContacts = this.navParams.get('totalContacts');
    this.data = this.navParams.get('event');
    console.log("Data: ", this.data);
    if (this.action === 'Edit') {
      this.client = this.data.client;
      this.index = this.data.index;
    }
    this.initializeForm();
  }

  private initializeForm() {
    let company = null;
    let fullname = null;
    let gender = 'Male';
    let email = null;
    let phone = null;

    if(this.action === 'Edit') {
      company = this.client.company;
      fullname = this.client.fullname;
      gender = this.client.gender
      email = this.client.email;
      phone = this.client.phone;
    }

    this.clientForm = new FormGroup({
      'company': new FormControl(company, Validators.required),
      'fullname': new FormControl(fullname, Validators.required),
      'gender': new FormControl(gender, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required)
    });
  }

  onAddClient() {
    const value = this.clientForm.value;
    if (this.action === 'Edit') {
      this.genericService.updateItem(this.index, value.company, value.fullname, value.gender, value.email, value.phone);
      this.navController.popToRoot();
    } else {
      this.genericService.addItem(value.company, value.fullname, value.gender, value.email, value.phone);
      this.navController.popToRoot();
    }
  }

}
