import { ClientModel } from '../models/client.model';

export class GenericService{
  private clients: ClientModel[] = [];

	addItem(company: string, fullname: string, gender: string, email: string, phone: string, product: string) {
    this.clients.push(new ClientModel(
      company, fullname, gender, email, phone, product
    ));
    console.log("Service: ", this.clients.slice());
  }

  getItems() {
    return this.clients.slice();
  }

  updateItem(index: number, company: string,
    fullname: string, gender: string, email: string, phone: string, product: string) {
    this.clients[index] = new ClientModel(company, fullname, gender, email, phone, product);
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
