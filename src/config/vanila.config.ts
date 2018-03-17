import { Routes  } from "@angular/router";
import { IConfig } from "@bingo/config";

class VanillaConfig implements IConfig {
    public getRoutes(component:string) : Routes
    {
        return [];
    }
    
    public exists(component:string) : boolean
    {
        return false;
    }
 }

 export var config: IConfig = new VanillaConfig();
 