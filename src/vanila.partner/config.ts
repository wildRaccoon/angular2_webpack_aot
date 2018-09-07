import { IConfig, PluginFeatures } from "@bingo/config";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

class VanillaConfig implements IConfig {
    public FeatureEnabled(feature:PluginFeatures) : boolean
    {
        return false;
    }
 }

export var config: IConfig = new VanillaConfig();


@NgModule({
    imports: [
      CommonModule
    ]
})
export class PartnerSharedModule
{
}