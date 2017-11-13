import { ClientModel } from '../models/client.model';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class GenericService{
  private clients: ClientModel[] = [];

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

  getItems2(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://test-app-d61e5.firebaseio.com/' + userId + '/clients.json?auth=' + token)
      .map((response) => {
        return response.json();
      })
      .do((data) => {
        console.log("data: " + data);
        this.clients = data;
      });
  }

  updateItem(index: number, company: string,
    fullname: string, gender: string, email: string, phone: string) {
    this.clients[index] = new ClientModel(company, fullname, gender, email, phone);
  }

  removeItem(key: any) {
    const position = this.clients.findIndex((clientEl: ClientModel) => {
      return clientEl.email == key;
    });
    this.clients.splice(position, 1);
  }

  filterItems(companySearch) {
    return this.clients.filter((item) => {
      return item.company.toLowerCase().indexOf(companySearch.toLowerCase()) > -1;
    });
  }

}
