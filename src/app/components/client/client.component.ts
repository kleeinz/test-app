import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'client',
  templateUrl: './client.component.html'
})
export class ClientComponent {
  @Input() client: ClientModel;
  @Input() index: number;
  @Output() removeClient:EventEmitter<ClientModel> = new EventEmitter<ClientModel>();
  @Output() updateClient:EventEmitter<{index: number, client: ClientModel}> = new EventEmitter<{index: number, client: ClientModel}>();

  onRemoveClient() {
    this.removeClient.emit(this.client);
  }

  onUpdateClient() {
    this.updateClient.emit({index: this.index, client: this.client});
  }
}
