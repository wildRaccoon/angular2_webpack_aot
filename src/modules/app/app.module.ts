import { AppComponent } from './norm/app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes, Router, Route } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TagDirective } from './app.tag';

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
    TagDirective, 
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

      for (var i = 0; i < routeConfig.length; i++) {
        if(routeConfig[i].path == "")
        {
          var item = routeConfig[i];
          
          routeConfig[i] = {
            path:"",
            loadChildren:"packageName#ReplaceSyncModule"
          };

          console.log("replaced component");
          console.log(routeConfig);

          break;
        }
      }

      router.resetConfig(routeConfig);
    }
  }
}
