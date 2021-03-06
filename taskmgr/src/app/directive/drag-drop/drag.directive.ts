import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][dragTag][draggedClass][dragData]'
})
export class DragDirective {

  private _isDraggable = false;
  @Input() dragData: any;
  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input('app-draggable')
  set isDraggable(value: boolean) {
    this._isDraggable = value;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${value}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragData, data: this.dragData});
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }


}
