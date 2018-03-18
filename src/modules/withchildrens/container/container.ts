import { Component } from '@angular/core';
import { WithChildrensRoute } from "@bingo/config"
import { config } from "@bingo/partner"

@Component({
  selector: 'my-container',
  templateUrl: './container.html',
  styleUrls: ['./container.scss']
})
export class ContainerComponent {
  public showPartnerOutlet:boolean = config.exists(WithChildrensRoute)
}
