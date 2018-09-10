import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child01Component } from "./components/child01/child01.component"
import { Child02Component } from "./components/child02/child02.component"
import { ContainerComponent } from "./container/container"
import { WithChildrensRouter } from './withchildrens.route';

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
  constructor()
  {
    console.log("With Childrens Module loaded.");
  }
}
