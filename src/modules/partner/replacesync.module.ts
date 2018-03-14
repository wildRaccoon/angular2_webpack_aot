import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceSyncComponent } from "./replacesync/replacesync";


const routeConfig:Routes = [
    {
        path: "",
        component: ReplaceSyncComponent
    }
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    ReplaceSyncComponent
  ]
})
export class ReplaceSyncModule
{
  public ShowName(): void
  {
      console.log("ReplaceSyncModule - loaded.");
  }
}