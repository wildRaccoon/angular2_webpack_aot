import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes  } from "@angular/router";

import { Child01Component } from "./child01/child01.component"
import { Child02Component } from "./child02/child02.component"

import { ContainerComponent } from "./container/container"

export const routeConfig:Routes = [
  {
    path: "",
    component: ContainerComponent,
    children: [
      {
        path:"ch01",
        component: Child01Component
      },
      {
        path:"ch02",
        component: Child02Component
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  declarations: [
  ],

  bootstrap: [
  ]
})
export class WithChildrensModule { 
}
