import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { routes } from './routes';

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WithChildrensRouter { 
  constructor(){
    console.log("default routes for withchild");
  }
}