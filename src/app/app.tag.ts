import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tag]',
  
})
export class TagDirective {
    constructor(private el: ElementRef, private r: Renderer2) {
        //document.documentElement

        r.addClass(document.documentElement,"chtml");

        //document.documentElement.classList.contains
        //console.log(this);

        //r.setAttribute()

        //var html = r.selectRootElement('document');
        //console.log(html);

        //var html = r.selectRootElement("html");
        // r.parentNode
        // r.setStyle(html,"color","green");

        el.nativeElement.style.backgroundColor = 'red';
    }
}