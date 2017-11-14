import { ClientModel } from '../models/client.model';
import { FirebaseClientModel } from '../models/firebase-client.model';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GenericService{
  private clients: ClientModel[] = [];
  public firebaseClientModel: FirebaseClientModel[] = [];


  constructor(private authService: AuthService, private http:Http) {

  }

  addItem(token:string, client:ClientModel) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.post('https://test-app-d61e5.firebaseio.com/' + userId + '/clients.json?auth=' + token, client)
      .map((response) => {
        return response.json();
      });

  }

  getItems(token: string):Observable<FirebaseClientModel[]> {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://test-app-d61e5.firebaseio.com/' + userId + '/clients.json?auth=' + token)
      .map((response) => {
        this.firebaseClientModel = [];
        for (let key in response.json()) {
          this.firebaseClientModel.push({key: key, client: response.json()[key]});
        }
        return this.firebaseClientModel;
      });
  }

  updateItem(token: string, key: string, client: ClientModel) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
              .put('https://test-app-d61e5.firebaseio.com/' + userId + '/clients/' + key + '.json?auth=' + token,
              client).map((response) => {
                return response.json();
              });
  }

  removeItem(token: string, key: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
              .delete('https://test-app-d61e5.firebaseio.com/' + userId + '/clients/' + key + '.json?auth=' + token)
              .map((response) => {
                return response.json();
              });
  }

  filterItems(companySearch) {
    return this.firebaseClientModel.filter((item) => {
       return item.client.company.toLowerCase().indexOf(companySearch.toLowerCase()) > -1;
    });
  }

}
