import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ContainerComponent } from "./container/container";
import { Child01Component } from "./components/child01/child01.component";
import { Child02Component } from "./components/child02/child02.component";
import { ConfigRoutes } from "@bingo/partner";

const routes:Routes = [
    ...ConfigRoutes["PluginRoutes.WithChildOverride"],
    {
      path: "",
      component: ContainerComponent,
      children: [
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
    }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WithChildrensRouter { 
}