import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from "./partnercomponent/partner.component";
import { ReplaceSyncComponent1 } from "./replacesync1/replacesync";


const routeConfig:Routes = [
    {
        path: "",
        component: PartnerComponent
    },
    {
      path: "p1",
      component: ReplaceSyncComponent1
    },
    {
      path: "p2",
      component: PartnerComponent
    }
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    PartnerComponent,
    ReplaceSyncComponent1
  ]
})
export class PartnerModule
{
  public ShowName(): void
  {
      console.log("PartnerModule - loaded.");
  }
}