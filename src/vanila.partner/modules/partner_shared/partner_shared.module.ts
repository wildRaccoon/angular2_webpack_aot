import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Logger } from "@bingo/config/interfaces/service/Logger.";
import { VanillaLogger } from "../../service/logger/VanillaLogger";

@NgModule({
    imports: [
      CommonModule
    ],
    providers:[
      { provide: Logger, useClass: VanillaLogger }
    ]
})
export class PartnerSharedModule
{
}