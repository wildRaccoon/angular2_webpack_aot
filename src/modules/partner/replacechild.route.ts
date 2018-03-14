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