import { Component } from '@angular/core';
import { ShowPartnerOutlet } from "../child.routes"

@Component({
  selector: 'my-container',
  templateUrl: './container.html',
  styleUrls: ['./container.scss']
})
export class ContainerComponent {
  public showPartnerOutlet:boolean = ShowPartnerOutlet
}
