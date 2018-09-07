import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppContainer } from './container/app.container';
import { HomeComponent } from './components/sync/home.component';
import { AppRoute } from './app.route';
import { PartnerSharedModule } from "@bingo/partner";
import { Logger } from '@bingo/config/interfaces/service/Logger.';
import { DynamicDirectiveItem } from '@bingo/config/interfaces/service/DynamicComponentFactory';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    HttpClientModule,
    AppRoute,
    PartnerSharedModule
  ],
  declarations: [
    AppContainer,
    HomeComponent,
    DynamicDirectiveItem
  ],

  bootstrap: [
    AppContainer 
  ],

  providers:    [
    {
        provide: LocationStrategy, useClass: PathLocationStrategy,        
    }
  ]
})
export class AppModule {
  constructor(private logger:Logger)
  {
    this.logger.Info("Test info message.");
  }
}
