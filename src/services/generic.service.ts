import { ClientModel } from '../models/client.model';

export class GenericService{
  private clients: ClientModel[] = [];

	addItem(company: string, fullname: string, gender: string, email: string, phone: string, product: string) {
    this.clients.push(new ClientModel(
      company, fullname, gender, email, phone, product
    ));
    console.log(this.clients);
  }

  getItems() {
    return this.clients.slice();
  }

  updateItem(index: number, company: string,
    fullname: string, gender: string, email: string, phone: string, product: string) {
    this.clients[index] = new ClientModel(company, fullname, gender, email, phone, product);
  }

  removeItem(index: number) {
    this.clients.splice(index, 1);
  }
}
