import { Component, ViewEncapsulation, Renderer2 } from '@angular/core';
import '../css/styles.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class AppComponent { 
  constructor(private r: Renderer2)
  {
    r.addClass(document.documentElement,"chtml");
    r.removeClass(document.documentElement,"c1");
  }
}
