import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyRoute } from './lazy.route';
import { LazyContainer } from './container/lazy.container';



@NgModule({
  imports: [
    CommonModule,
    LazyRoute
  ],
  declarations: [
    LazyContainer
  ]
})
export class LazyModule { }
