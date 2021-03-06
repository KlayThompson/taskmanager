import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {combineLatest, merge, Subscription} from 'rxjs';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  format,
} from 'date-fns';
import {isValidDate} from '../../utils/date.util';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AgeInputComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AgeInputComponent)
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  ageUnits = [
    {
      value: AgeUnit.Year,
      label: '岁'
    },
    {
      value: AgeUnit.Month,
      label: '月'
    },
    {
      value: AgeUnit.Day,
      label: '日'
    }];
  selectUnit = AgeUnit.Year;
  form: FormGroup;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthTop = 24;
  @Input() monthBottom = 1;
  @Input() yearTop = 150;
  @Input() yearBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 300;
  sub: Subscription;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .pipe(
          map(d => {
          return {date: d, from: 'birthday'};
          },
          filter(_ => birthday.valid)
        ));
    const ageNum$ = ageNum.valueChanges
      .pipe(
        startWith(ageNum.value),
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      );
    const ageUnit$ = ageUnit.valueChanges
      .pipe(
        startWith(ageUnit.value),
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      );
    const age$ = combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    }).pipe(
          map(d => {
          return {date: d, from: 'age'};
        },
          filter(_ => this.form.get('age').valid)
    ));

    const merged$ = merge(birthday$, age$)
      .pipe(
      filter(_ => this.form.valid)
      );
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          this.selectUnit = age.unit;
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Day
      };
    }
  }

  private toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthdayInvalid: true
    };
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    };
  }

  validateAge(ageNumKey: string, ageUnitKey: string): {[key: string]: any} {
    return (group: FormGroup): {[key: string]: any} => {
        const ageNum = group.controls[ageNumKey];
        const ageUnit = group.controls[ageUnitKey];
        let result = false;
        const ageNumVal = ageNum.value;

        switch (ageUnit.value) {
          case AgeUnit.Year: {
            result = ageNumVal >= this.yearBottom && ageNumVal < this.yearTop;
            break;
          }
          case AgeUnit.Month: {
            result = ageNumVal >= this.monthBottom && ageNumVal < this.monthTop;
            break;
          }
          case AgeUnit.Day: {
            result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
            break;
          }
          default: {
            break;
          }
        }
        return result ? null : {
          ageInvalid: true
        };
    };
  }

  // 写入控件值
  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
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
}
