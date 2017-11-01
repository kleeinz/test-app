import { Component, Input } from '@angular/core';

@Component({
  selector: 'client',
  templateUrl: './client.component.html'
})
export class ClientComponent {
  @Input() company:string;
  @Input() fullname:string;
  @Input() gender:string;
  @Input() email:string;
  @Input() product:string;
  @Input() phone:string;
  @Input() lastUpdate:string;
}
