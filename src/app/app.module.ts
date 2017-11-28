import { AppComponent } from './app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// export function loadAModule() {
//   return require('@a_package').AModule;
// }

import { AComponent } from '@a_package';


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
      component: AComponent      
      //loadChildren: loadAModule
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
    //,AComponent
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
export class AppModule { }
