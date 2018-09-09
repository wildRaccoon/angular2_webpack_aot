import { Routes  } from "@angular/router";
import { IConfig,PluginFeatures, PluginRoutes } from "@bingo/config";


export const ConfigRoutes = {
    "PluginRoutes.WithChildOverride" : [
        {
            path: "",
            loadChildren: "@bingo/partner/modules/partner_withchild/partner_withchild.module#PartnerWithChildModule"
        }
    ]
};


export class PartnerConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return feature == PluginFeatures.Partner;

    };

    public RouteEnabled(r:PluginRoutes) : boolean {
        return r == PluginRoutes.WithChildOverride;
    }
 }

 export var config: IConfig = new PartnerConfig();