import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDraggable][dragClass]'
})
export class DragDirective {

  private _isDraggable = false;

  @Input('appDraggable')
  set isDraggable(draggable: boolean) {
    this._isDraggable = draggable;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${draggable}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  @Input() dragClass: string;
  constructor( private el: ElementRef, private rd: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      console.log(this.dragClass);
      this.rd.addClass(this.el, this.dragClass);
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el, this.dragClass);
    }
  }


}
