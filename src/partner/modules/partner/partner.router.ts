import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { PartnerContaner } from "./container/partner.container";
import { ReplaceSyncComponent } from "./components/replacesync/replacesync";
import { ReplaceSyncComponent1 } from "./components/replacesync1/replacesync";


const routeConfig:Routes = [
    {
        path: "",
        component: PartnerContaner,
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
    RouterModule.forChild(routeConfig)
  ],
  exports: [RouterModule]
})
export class PartnerRouter
{
}