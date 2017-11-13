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

	addItem(company: string, fullname: string, gender: string, email: string, phone: string) {
    this.clients.push(new ClientModel(
      company, fullname, gender, email, phone ));
  }

  addItem2(token:string, client:ClientModel) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.post('https://test-app-d61e5.firebaseio.com/' + userId + '/clients.json?auth=' + token, client)
      .map((response) => {
        return response.json();
      });

  }

  getItems() {
    return this.clients.slice();
  }

  getItems2(token: string):Observable<FirebaseClientModel[]> {
    this.firebaseClientModel = [];
  //  this.clients = [];
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://test-app-d61e5.firebaseio.com/' + userId + '/clients.json?auth=' + token)
      .map((response) => {
        for (let key in response.json()) {
          this.firebaseClientModel.push({key: key, client: response.json()[key]});
        }
        return this.firebaseClientModel;
      });
  }

  updateItem(index: number, company: string,
    fullname: string, gender: string, email: string, phone: string) {
    this.clients[index] = new ClientModel(company, fullname, gender, email, phone);
  }

  updateItem2(token: string, key: string, client: ClientModel) {
    const userId = this.authService.getActiveUser().uid;
    console.log("key: ", key);
    console.log("client: ", client);
    return this.http
              .put('https://test-app-d61e5.firebaseio.com/' + userId + '/clients/' + key + '.json?auth=' + token,
              client).map((response) => {
                console.log("response: " + response);
                return response.json();
              }, error=> console.log(error));
  }

  removeItem(key: any) {
    const position = this.clients.findIndex((clientEl: ClientModel) => {
      return clientEl.email == key;
    });
    this.clients.splice(position, 1);
  }

  removeItem2(token: string, key: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
              .delete('https://test-app-d61e5.firebaseio.com/' + userId + '/clients/' + key + '.json?auth=' + token)
              .map((response) => {
                console.log("response: " + response);
                return response.json();
              });
  }

  filterItems(companySearch) {
    return this.firebaseClientModel.filter((item) => {
       return item.client.company.toLowerCase().indexOf(companySearch.toLowerCase()) > -1;
    });
  }

}
