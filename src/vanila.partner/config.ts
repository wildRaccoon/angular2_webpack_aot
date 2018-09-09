import { IConfig, PluginFeatures, PluginRoutes } from "@bingo/config";
import { Routes } from "@angular/router";

export const ConfigRoutes:{ [email: string]: Routes; }  = {
};

class VanillaConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return false;
    }

    public RouteEnabled(r:PluginRoutes) : boolean {
        return false;
    }
 }

export var config: IConfig = new VanillaConfig();