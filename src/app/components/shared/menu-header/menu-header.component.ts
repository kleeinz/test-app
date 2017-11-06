import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-header',
  templateUrl: './menu-header.component.html'
})
export class MenuHeaderComponent {
  @Input() title: string;
}
