import { Routes } from "@angular/router";

export const routes:Routes = [
    {
        path: "",
        loadChildren:"@bingo/partner/modules/partner_withchild/partner_withchild.module#PartnerWithChildModule"
    } 
  ];