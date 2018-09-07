import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppContainer } from './container/app.container';
import { HomeComponent } from './components/sync/home.component';
import { AppRoute } from './app.route';
import { PartnerSharedModule } from "@bingo/partner";


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    HttpClientModule,
    AppRoute,
    PartnerSharedModule
  ],
  declarations: [
    AppContainer,
    HomeComponent
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
}
