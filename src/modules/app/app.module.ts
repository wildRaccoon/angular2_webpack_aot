import { AppComponent } from './norm/app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes, Router, Route } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PartnerRoute } from "@bingo/config"
import { config } from "@bingo/partner"

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
  constructor(
    private router:Router
  )
  {
    if(config.exists(PartnerRoute))
    {
      routeConfig.push(...config.getRoutes(PartnerRoute));

      // for (var i = 0; i < routeConfig.length; i++) {
      //   if(routeConfig[i].path == "")
      //   {
      //     var item = routeConfig[i];
          
      //     routeConfig[i] = {
      //       path:"",
      //       loadChildren:"packageName#ReplaceSyncModule"
      //     };

      //     //console.log("replaced component");
      //     //console.log(routeConfig);

      //     break;
      //   }
      // }

      router.resetConfig(routeConfig);
    }
  }
}
