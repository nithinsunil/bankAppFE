import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = "orange" // accessing HTML tag and changing its bg color (keep in mind to copy the selector from here and paste inside HTML tag)
  }

}
