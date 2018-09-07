import { Component, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { DynamicComponentFactory, eDynamicItems, DynamicDirectiveItem } from '@bingo/config/interfaces/service/DynamicComponentFactory';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(DynamicDirectiveItem) dynamicHost: DynamicDirectiveItem;

  constructor(private compfactory: DynamicComponentFactory, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    if (this.compfactory.IsSupported(eDynamicItems.HelloComponent)) {
      try {
        let item = this.compfactory.CreateComponent(eDynamicItems.HelloComponent, null);

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);

        let viewContainerRef = this.dynamicHost.viewContainerRef;

        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}
