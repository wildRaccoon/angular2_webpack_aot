import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child01Component } from "./components/child01/child01.component"
import { Child02Component } from "./components/child02/child02.component"
import { ContainerComponent } from "./container/container"
import { WithChildrensRouter } from './withchildrens.route';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    WithChildrensRouter
  ],
  declarations: [
    ContainerComponent, 
    Child01Component,
    Child02Component
  ]
})
export class WithChildrensModule { 
  constructor(private router:Router)
  {
    console.log("With Childrens Module loaded.");

    console.log(router.config);
  }
}
