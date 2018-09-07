import { DynamicComponentFactory, eDynamicItems, DynamicComponentItem } from "@bingo/config/interfaces/service/DynamicComponentFactory";
import { VanillaHelloComponent } from "../../modules/partner_shared/components/VanillaHello/vanillahello.component";
import { Logger } from "@bingo/config/interfaces/service/Logger.";
import { Injectable } from "@angular/core";


@Injectable()
export class VanillaComponentFactory implements DynamicComponentFactory {
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
            return new DynamicComponentItem(VanillaHelloComponent,data);
        }

        return null;
    }
}