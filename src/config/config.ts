import {Routes} from '@angular/router'

export interface IConfig {
    FeatureEnabled(feature:PluginFeatures) : boolean
} 

export enum PluginFeatures
{
    Partner
}
