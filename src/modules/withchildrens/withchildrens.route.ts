import { Routes } from "@angular/router";
import { ContainerComponent } from "./container/container";
import { Child01Component } from "./child01/child01.component";
import { Child02Component } from "./child02/child02.component";

export const WithChildrensRoute:Routes = [
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