import { Component, ViewEncapsulation, Renderer2 } from '@angular/core';
import { config } from '@bingo/partner';
import { PluginFeatures } from '@bingo/config';

import '../../../assets/css/styles.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  public EnablePartner:boolean = config.FeatureEnabled(PluginFeatures.Partner);
}
