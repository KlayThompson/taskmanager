import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../domain/user.model';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, startWith, switchMap} from 'rxjs/operators';
import {UserService} from '../../sevice/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ChipsListComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ChipsListComponent)
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() label = '添加/修改成员';
  @Input() placeholder = '请输入成员 email';
  @Input() members: User[];
  @Input() multiple = true;
  form: FormGroup;
  memberResults$: Observable<User[]>;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder, private service: UserService) {
    this.members = [];
  }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.searchUser(this.form.controls['memberSearch'].valueChanges);
  }

  /**
   * 移除该用户
   * @param member 用户
   */
  removeMember(member: User) {
    const ids = this.members.map(user => user.id);
    const index = ids.indexOf(member.id);
    if (this.multiple) {
      this.members = [...this.members.slice(0, index), ...this.members.slice(index + 1)];
    } else {
      this.members = [];
    }
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.members);
  }

  /**
   * 点击了筛选出来的用户
   * @param user 用户
   */
  handleMemberSelection(user: User) {
    if (this.members.map(u => u.id).indexOf(user.id) !== -1) {
      return;
    }
    if (this.multiple) {
      this.members = [...this.members, user];
    } else {
      this.members = [user];
    }
    this.form.patchValue({memberSearch: user.name});
    this.propagateChange(this.members);
  }

  /**
   * 根据email筛选用户
   * @param obs 输入的数据流
   */
  searchUser(obs: Observable<string>): Observable<User[]> {
    return obs.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      filter(r => r && r.length > 1),
      switchMap(value => this.service.searchUsers(value))
    );
  }

  /**
   * 显示的用户
   * @param user 用户
   */
  displayUser(user: User): string {
    return user ? user.name : '';
  }

  /**
   * 是否显示输入框
   */
  get displayInput(): boolean {
    return this.multiple || this.members.length === 0;
  }

  // 写入控件值
  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
        const userEntities = obj.reduce((e, c) => ({...e, c}), {});
        if (this.members) {
          const remaining = this.members.filter(item => !userEntities[item.id]);
          this.members = [...remaining, ...obj];
        }
    } else if (obj && !this.multiple) {
      this.members = [...obj];
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
    return this.members ? null : {
      chipListInvalid: {
        valid: false
      }
    };
  }
}
