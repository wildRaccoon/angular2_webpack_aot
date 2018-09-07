import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerContaner } from "./container/partner.container";
import { ReplaceSyncComponent } from "./components/replacesync/replacesync";
import { ReplaceSyncComponent1 } from "./components/replacesync1/replacesync";
import { PartnerRouter } from "./partner.router";

@NgModule({
  imports: [
    CommonModule,
    PartnerRouter
  ],
  declarations: [
    PartnerContaner,
    ReplaceSyncComponent,
    ReplaceSyncComponent1
  ]
})
export class PartnerModule
{
  public ShowName(): void
  {
      console.log("PartnerModule - loaded.");
  }
}