import { Routes  } from "@angular/router";

export const CustomChildRoutes:Routes = [
    {
      path:"",
      redirectTo:"ch01",
      pathMatch:"full"
    },
    {
      path:"ch01",
      loadChildren:"./partner.module#PartnerModule"
    },
    {
      path:"ch02",
      loadChildren:"./replacesync.module#ReplaceSyncModule"
    }
  ]

  export const CustomOutletRoutes:Routes = [
    {
      path:"",  
      loadChildren:"./partner.module#PartnerModule"
    }
  ]

export const ShowPartnerOutlet:boolean = CustomOutletRoutes.length > 0;
