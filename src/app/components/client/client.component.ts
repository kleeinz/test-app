import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'client',
  templateUrl: './client.component.html'
})
export class ClientComponent {
  @Input() client: ClientModel;
  @Output() removeClient:EventEmitter<ClientModel> = new EventEmitter<ClientModel>();

  onRemoveClient() {
    this.removeClient.emit(this.client);
  }
}
