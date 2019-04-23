import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  selected: string;
  @Input() cols = 8;
  @Input() rowHeight = '64px';
  @Input() itemWidth = '80px';
  @Input() title = '选择封面：';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;

  private propagateChange = (_: any) => {};
  constructor() { }

  onChanged(index: number) {
    this.selected = this.items[index];
    this.propagateChange(this.selected);
  }

  // 写入控件值
  writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.selected = obj;
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  // 这里没有使用，用于注册 touched 状态
  registerOnTouched(fn: any): void {

  }

  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      valid: false
    };
  }
}
