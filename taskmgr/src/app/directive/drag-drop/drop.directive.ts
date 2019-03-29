import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {

  @Input() dragEnterClass: string;
  constructor( private el: ElementRef, private rd: Renderer2) { }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el, this.dragEnterClass);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el, this.dragEnterClass);
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el, this.dragEnterClass);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el, this.dragEnterClass);
    }
  }
}
