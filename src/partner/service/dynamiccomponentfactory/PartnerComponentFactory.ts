import { DynamicComponentFactory, eDynamicItems, DynamicComponentItem } from "@bingo/config/interfaces/service/DynamicComponentFactory";
import { Logger } from "@bingo/config/interfaces/service/Logger.";
import { Injectable } from "@angular/core";
import { PartnerHelloComponent } from "../../modules/partner_shared/components/PartnerHello/partnerhello.component";


@Injectable()
export class PartnerComponentFactory implements DynamicComponentFactory {
    constructor(private logger:Logger)
    {
        
    }


    public IsSupported(item: eDynamicItems): boolean {
        this.logger.Info(`Check is supported ${item}`);

        return item == eDynamicItems.HelloComponent;
    }    
    
    public CreateComponent(item: eDynamicItems,data: any): DynamicComponentItem {
        this.logger.Info(`Create item ${item}`);

        if(item == eDynamicItems.HelloComponent)
        {
            return new DynamicComponentItem(PartnerHelloComponent,data);
        }

        return null;
    }
}