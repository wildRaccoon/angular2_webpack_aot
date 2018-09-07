import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartnerSharedRouter } from "./partner_shared.router";
import { PartnerLogger } from "../../service/logger/PartnerLogger";
import { Logger } from "@bingo/config/interfaces/service/Logger.";

@NgModule({
    imports: [
      CommonModule,
      PartnerSharedRouter
    ],
    providers:[
      { provide: Logger, useClass: PartnerLogger }
    ]
})
export class PartnerSharedModule
{
}