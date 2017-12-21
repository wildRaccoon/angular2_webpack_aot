import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from "./partner.component";


export const routeConfig:Routes = [
    {
        path: "",
        component: PartnerComponent
    }
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    PartnerComponent
  ]
})
export class PartnerModule
{
  public ShowName(): void
  {
      console.log("PartnerModule - loaded.");
  }
}