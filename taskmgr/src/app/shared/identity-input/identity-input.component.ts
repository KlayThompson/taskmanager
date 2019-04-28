import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {Identity, IdentityType, User} from '../../domain/user.model';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {isValidAddr, extractInfo} from '../../utils/identity.util';
import {isValidDate} from '../../utils/date.util';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IdentityInputComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => IdentityInputComponent)
    }
  ]
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  identityTypes: {value: IdentityType, label: string}[] = [
    {value: IdentityType.IdCard, label: '身份证'},
    {value: IdentityType.Insurance, label: '医保卡'},
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Passport, label: '护照'},
    {value: IdentityType.Other, label: '其他'},
  ];
  identity: Identity = {identityType: null, identityNo: null};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private sub: Subscription;
  private propagateChange = (_: any) => {};
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onIdTypeChanged(idType) {
    this._idType.next(idType);
  }

  onIdNumChanged(idNum) {
    this._idNo.next(idNum);
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
    if (!c.value) {
      return;
    }
    switch (c.value.IdentityType) {
      case IdentityType.IdCard: {
        return this.validateIdNumber(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  private validateIdNumber(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid:  true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    let result = false;
    if (pattern.test(val)) {
      const info = extractInfo(val);
      if (isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
        result = true;
      }
    }
    return result ? null : {idNotValid:  true};
  }

  private validatePassport(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validateMilitary(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }
}
