import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { WChildContContaner } from "./container/wchildcont.container";
import { WChild1Component } from "./components/wchild1/wchild1.component";
import { WChild2Component } from "./components/wchild2/wchild2.component";

const routeConfig:Routes = [
    {
        path: "",
        component: WChildContContaner,
        children: [
          {
            path:"",
            redirectTo:"p1",
            pathMatch:"full"
          },
          {
            path: "p1",
            component: WChild1Component
          },
          {
            path: "p2",
            component: WChild2Component
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
export class PartnerWChildRouter
{
}