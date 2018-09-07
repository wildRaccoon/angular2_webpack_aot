import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Logger } from "@bingo/config/interfaces/service/Logger.";
import { VanillaLogger } from "../../service/logger/VanillaLogger";
import { VanillaHelloComponent } from "../../modules/partner_shared/components/VanillaHello/vanillahello.component";
import { DynamicComponentFactory } from "@bingo/config/interfaces/service/DynamicComponentFactory";
import { VanillaComponentFactory } from "../../service/dynamiccomponentfactory/VanillaComponentFactory";

@NgModule({
    imports: [
      CommonModule      
    ],
    
    declarations:[
      VanillaHelloComponent
    ],

    exports:[
      VanillaHelloComponent
    ],

    entryComponents:[
      VanillaHelloComponent
    ],

    providers:[
      { provide: Logger, useClass: VanillaLogger },
      { provide: DynamicComponentFactory, useClass: VanillaComponentFactory }
    ]
})
export class PartnerSharedModule
{
}