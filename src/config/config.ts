import {Routes} from '@angular/router'

export interface IConfig {
    FeatureEnabled(feature:PluginFeatures) : boolean
    RouteEnabled(r:PluginRoutes) : boolean
} 

export enum PluginFeatures
{
    Partner
}

export enum PluginRoutes {
    WithChildOverride
}
