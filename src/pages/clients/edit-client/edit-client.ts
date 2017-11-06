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
  private selectGender = ['Male', 'Female'];
  private selectProduct = ['PC', 'USB', 'Monitor'];
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
    this.initializeForm();
  }

  private initializeForm() {
    this.clientForm = new FormGroup({
      'company': new FormControl(null, Validators.required),
      'fullname': new FormControl(null, Validators.required),
      'gender': new FormControl('Male', Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'product': new FormControl('Pc', Validators.required),
    });
  }

  onAddClient() {
    const value = this.clientForm.value;
    this.genericService.addItem(value.company, value.fullname, value.gender, value.email, value.phone, value.product);
    this.navController.popToRoot();
  }

}