import { Routes  } from "@angular/router";
import { IConfig,PluginFeatures } from "@bingo/config";

class PartnerConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return feature == PluginFeatures.Partner;
    };
 }

 export var config: IConfig = new PartnerConfig();