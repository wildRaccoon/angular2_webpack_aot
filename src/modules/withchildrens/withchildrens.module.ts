import { NgModule } from '@angular/core';
import { RouterModule  } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Child01Component } from "./child01/child01.component"
import { Child02Component } from "./child02/child02.component"
import { ContainerComponent } from "./container/container"
import { WithChildrensRoute } from '@bingo/partner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WithChildrensRoute)
  ],
  declarations: [
    ContainerComponent, 
    Child01Component,
    Child02Component
  ]
})
export class WithChildrensModule { 
}
