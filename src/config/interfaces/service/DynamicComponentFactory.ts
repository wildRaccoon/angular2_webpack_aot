import { Injectable, Directive, ViewContainerRef } from "@angular/core";
import { Type } from '@angular/core';

@Directive({
    selector: '[dynamic-host]',
})
export class DynamicDirectiveItem {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

export class DynamicComponentItem {
  constructor(public component: Type<any>, public data: any) {}
}

export enum eDynamicItems {
    HelloComponent
}

@Injectable()
export abstract class DynamicComponentFactory {
    abstract IsSupported(item:eDynamicItems):boolean;
    abstract CreateComponent(item:eDynamicItems,data: any):DynamicComponentItem;
}