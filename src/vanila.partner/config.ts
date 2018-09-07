import { IConfig, PluginFeatures } from "@bingo/config";

class VanillaConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return false;
    }
 }

export var config: IConfig = new VanillaConfig();