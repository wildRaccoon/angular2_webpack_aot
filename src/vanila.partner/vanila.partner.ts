import { Routes  } from "@angular/router";
import { IConfig, PluginFeatures } from "@bingo/config";

class VanillaConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return false;
    }
 }

export var config: IConfig = new VanillaConfig();

//export routes which can be replaced in app
export const PartnerRoutes:Routes = [];
export * from "../modules/withchildrens/withchildrens.route"; 