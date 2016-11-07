import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';

import { LazyComponent } from './lazy.component';

export const routeConfig:Routes = [
    {
        path:"",
        component:LazyComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    LazyComponent
  ],
  providers: []
})
export class LazyModule { }
