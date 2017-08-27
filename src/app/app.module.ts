import { AppComponent } from './app.component';
import { HomeComponent } from './sync/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';



export const routeConfig:Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path:"lazy",
        loadChildren:"./lazy/lazy.module#LazyModule"
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
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
