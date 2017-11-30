import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';

import { SubComponent } from './sub_component';

export const routeConfig:Routes = [
    {
        path:"",
        component:SubComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    SubComponent
  ]
})
export class SubModule { }
