import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/sync/home.component';

export const routeConfig:Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path:"lazy",
        loadChildren:"../lazy/lazy.module#LazyModule"
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
      RouterModule.forRoot(routeConfig)
    ],
    exports: [RouterModule]
  })
  export class AppRoute { 
  }