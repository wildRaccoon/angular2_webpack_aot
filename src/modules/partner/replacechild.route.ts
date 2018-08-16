import { Routes  } from "@angular/router";
import { IConfig,PluginFeatures } from "@bingo/config";

class PartnerConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return feature == PluginFeatures.Partner;
    };
 }

 export var config: IConfig = new PartnerConfig();

 export const PartnerRoutes:Routes = [
        {
          path:"partner",
          loadChildren:"@bingo/partner#PartnerModule"
        }
      ];

export const WithChildrensRoute:Routes = [
  {
    path:"",
    loadChildren:"@bingo/partner#PartnerModule"
  }
];