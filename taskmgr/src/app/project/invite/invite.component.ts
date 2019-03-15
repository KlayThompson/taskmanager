import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  users = [
    {
      'id': 1,
      'name': 'Nancy'
    },
    {
      'id': 2,
      'name': 'Alex'
    },
    {
      'id': 3,
      'name': 'Alice'
    }
  ];
  constructor(private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
  }

  onSaveClick() {

  }

  closeClick() {
    this.dialogRef.close();
  }

  displayUser(user: {'id': string, 'name': string}) {
    return user ? user.name : '';
  }
}
