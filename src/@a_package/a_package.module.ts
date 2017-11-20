import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';

import { AComponent } from './a_component/a_component';

export const routeConfig:Routes = [
    {
        path:"",
        component:AComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    AComponent
  ]
})
export class AModule { }
