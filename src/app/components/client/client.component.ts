import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from '../../../models/client.model';
import { FirebaseClientModel } from '../../../models/firebase-client.model';

@Component({
  selector: 'client',
  templateUrl: './client.component.html'
})
export class ClientComponent {
  @Input() firebaseClient: FirebaseClientModel;
  @Input() index: number;
  @Output() removeClient:EventEmitter<FirebaseClientModel> = new EventEmitter<FirebaseClientModel>();
  @Output() updateClient:EventEmitter<FirebaseClientModel> = new EventEmitter<FirebaseClientModel>();

  onRemoveClient() {
    this.removeClient.emit(this.firebaseClient);
  }

  onUpdateClient() {
    this.updateClient.emit(this.firebaseClient);
  }
}
