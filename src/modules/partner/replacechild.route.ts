import { Routes  } from "@angular/router";
import { IConfig, WithChildrensRoute, PartnerRoute } from "@bingo/config";

class PartnerConfig implements IConfig {
    public getRoutes(component:string) : Routes
    {
      if(component == WithChildrensRoute)
      {
        return [
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
        ];
      }

      if(component == PartnerRoute)
      {
        return [
          {
            path:PartnerRoute,
            loadChildren:"./partner.module#PartnerModule"
          }
        ];
      }
        
      return [];
    }
    
    public exists(component:string) : boolean
    {
        return component == WithChildrensRoute || component == PartnerRoute;
    }
 }

 export var config: IConfig = new PartnerConfig();