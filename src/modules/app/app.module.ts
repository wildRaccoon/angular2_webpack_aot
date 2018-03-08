import { AppComponent } from './norm/app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes, Router } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

declare var __ADD_PARTNER_ROUTE__:boolean; 

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
    }
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
  constructor(private router:Router)
  {
    if(__ADD_PARTNER_ROUTE__)
    {
      routeConfig.push({
        path:"partner",
        loadChildren: "packageName#PartnerModule"
      });

      router.resetConfig(routeConfig);
    }
  }
}
