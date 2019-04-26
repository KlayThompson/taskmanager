import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../domain/user.model';
import {Observable} from 'rxjs';

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
export class ChipsListComponent implements OnInit {

  @Input() label = '添加/修改成员';
  @Input() placeholder = '请输入成员 email';
  @Input() members = [];
  form: FormGroup;
  memberResults$: Observable<User[]>;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }


  removeMember(member: User) {

  }

  handleMemberSelection(user: User) {

  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }
}
