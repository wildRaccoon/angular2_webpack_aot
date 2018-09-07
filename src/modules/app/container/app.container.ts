import { Component, ViewEncapsulation, Renderer2 } from '@angular/core';
import { config } from '@bingo/partner';
import { PluginFeatures } from '@bingo/config';

import '../../../assets/css/styles.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.container.html',
  styleUrls: ['./app.container.scss']
})
export class AppContainer { 
  public EnablePartner:boolean = config.FeatureEnabled(PluginFeatures.Partner);
}
