import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LazyContainer } from './container/lazy.container';

export const routeConfig:Routes = [
    {
        path:"",
        component:LazyContainer
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(routeConfig)
    ],
    exports: [RouterModule]
  })
  export class LazyRoute { 
  }