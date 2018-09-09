import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WChildContContaner } from './container/wchildcont.container';
import { WChild1Component } from './components/wchild1/wchild1.component';
import { WChild2Component } from './components/wchild2/wchild2.component';
import { PartnerWChildRouter } from './partner_withchild.router';

@NgModule({
  imports: [
    CommonModule,
    PartnerWChildRouter
  ],
  declarations: [
    WChildContContaner,
    WChild1Component,
    WChild2Component
  ]
})
export class PartnerWithChildModule
{
  public ShowName(): void
  {
      console.log("PartnerWith Children Module - loaded.");
  }
}