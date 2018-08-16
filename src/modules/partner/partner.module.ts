import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from "./partnercomponent/partner.component";
import { ReplaceSyncComponent1 } from "./replacesync1/replacesync";
import { ReplaceSyncComponent } from "./replacesync/replacesync";


const routeConfig:Routes = [
    {
        path: "",
        component: PartnerComponent,
        children: [
          {
            path:"",
            redirectTo:"p1",
            pathMatch:"full"
          },
          {
            path: "p1",
            component: ReplaceSyncComponent
          },
          {
            path: "p2",
            component: ReplaceSyncComponent1
          }
        ]
    } 
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    PartnerComponent,
    ReplaceSyncComponent,
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