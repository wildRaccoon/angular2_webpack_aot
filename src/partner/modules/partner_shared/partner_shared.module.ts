import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartnerSharedRouter } from "./partner_shared.router";
import { PartnerLogger } from "../../service/logger/PartnerLogger";
import { Logger } from "@bingo/config/interfaces/service/Logger.";
import { PartnerHelloComponent } from "./components/PartnerHello/partnerhello.component";
import { DynamicComponentFactory } from "@bingo/config/interfaces/service/DynamicComponentFactory";
import { PartnerComponentFactory } from "../../service/dynamiccomponentfactory/PartnerComponentFactory";

@NgModule({
    imports: [
      CommonModule,
      PartnerSharedRouter
    ],

    declarations:[
      PartnerHelloComponent
    ],

    exports:[
      PartnerHelloComponent
    ],

    entryComponents:[
      PartnerHelloComponent
    ],

    providers:[
      { provide: Logger, useClass: PartnerLogger },
      { provide: DynamicComponentFactory, useClass: PartnerComponentFactory }
    ]
})
export class PartnerSharedModule
{
}