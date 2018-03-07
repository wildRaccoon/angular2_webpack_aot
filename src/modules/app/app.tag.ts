import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[tag]',
  
})
export class TagDirective {
    constructor(private el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'red';
    }
}