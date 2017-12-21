import { AppComponent } from './app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes, Router } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BaseExternalModuleResolver } from "./external/external.resolver";

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
      loadChildren:"./external#AModule"
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
        provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ]
})
export class AppModule { 
  constructor(private externlModule:BaseExternalModuleResolver, private router:Router)
  {
    routeConfig.push({
      path:"partner",
      loadChildren: () => externlModule.GetModule()
    });

    router.resetConfig(routeConfig);
  }
}
