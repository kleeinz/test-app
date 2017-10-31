import { Component, Input } from '@angular/core';

@Component({
  selector: 'client',
  templateUrl: './client.component.html'
})
export class ClientComponent {
  @Input() company:string = 'Compañia';
  @Input() contactName:string = 'Martin McFly';
  @Input() gender:string = 'Male';
  @Input() email:string = 'martin@cpy.com';
  @Input() product:string = 'PC';
  @Input() phone:string = '3111585799';
  @Input() lastUpdate: string = '4d ago';
}
