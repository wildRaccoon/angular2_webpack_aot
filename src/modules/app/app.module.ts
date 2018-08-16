import { AppComponent } from './norm/app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PartnerRoutes } from "@bingo/partner";

export const routeConfig:Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path:"lazy",
        loadChildren:"./lazy/lazy.module#LazyModule"
    },
    {
      path: "a_package",
      loadChildren:"@a_package#AModule"
    },
    {
      path:"withchild",
      loadChildren: "../withchildrens/withchildrens.module#WithChildrensModule"
    },
    ...PartnerRoutes
];

@NgModule({
  imports: [
    BrowserModule,    
    RouterModule.forRoot(routeConfig)
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],

  bootstrap: [
    AppComponent 
  ],

  providers:    [
    {
        provide: LocationStrategy, useClass: HashLocationStrategy,        
    }
  ]
})
export class AppModule {
}
