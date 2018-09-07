import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

const routeConfig:Routes = [
  {
    path:"partner",
    //loadChildren:"@bingo/partner/modules/partner/partner.module#PartnerModule"
    loadChildren:"../partner/partner.module#PartnerModule"
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routeConfig)
  ],
  exports: [RouterModule]
})
export class PartnerSharedRouter
{
}