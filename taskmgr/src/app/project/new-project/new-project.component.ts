import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
  ) { }

  ngOnInit() {
    console.log(JSON.stringify(this.data));
  }

  onSaveClick() {
    this.dialogRef.close('i received your message');
  }

  closeClick() {
    this.dialogRef.close();
  }
}
