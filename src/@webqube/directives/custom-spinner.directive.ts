import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: "[customSpinner]"
})
export class CustomSpinnerDirective implements AfterViewInit{

  @Input() color: string;

  constructor(
    private elem: ElementRef
  ){}

  ngAfterViewInit(){
    if(!!this.color){
      const element = this.elem.nativeElement;
      const circle = element.querySelector("circle");
      circle.style.stroke = this.color;
    }
  }

}
