import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Child01Component } from "./child01/child01.component"
import { Child02Component } from "./child02/child02.component"
import { CustomChildRoutes,CustomOutletRoutes } from "./child.routes"

import { ContainerComponent } from "./container/container"

export const routeConfig:Routes = [
  {
    path: "",
    component: ContainerComponent,
    children: CustomOutletRoutes.length > 0 ? 
      CustomOutletRoutes : 
      [
        {
          path:"",
          redirectTo:"ch01",
          pathMatch:"full"
        },
        {
          path:"ch01",
          component: Child01Component
        },
        {
          path:"ch02",
          component: Child02Component
        }
      ]
  },
  //...CustomOutletRoutes
];

console.log(routeConfig);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    ContainerComponent, 
    Child01Component,
    Child02Component
  ]
})
export class WithChildrensModule { 
  constructor(){
    //console.log(CustomOutletRoutes);
  }
}
