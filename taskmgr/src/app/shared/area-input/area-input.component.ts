import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../domain/user.model';

@Component({
  selector: 'app-area-input',
  templateUrl: './area-input.component.html',
  styleUrls: ['./area-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AreaInputComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AreaInputComponent)
    }
  ]
})
export class AreaInputComponent implements OnInit, ControlValueAccessor {

  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  // 写入控件值
  writeValue(obj: User[]): void {

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
    return this.members ? null : {
      chipListInvalid: {
        valid: false
      }
    };
  }
}
