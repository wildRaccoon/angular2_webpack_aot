import {Routes} from '@angular/router'

export interface IConfig {
   getRoutes(component:string) : Routes
   exists(component:string) : boolean
} 

export const WithChildrensRoute:string = "withchildren";
export const PartnerRoute:string = "partner";
