import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{title}}</h2>
    <div mat-dialog-content>
      {{content}}
    </div>
    <mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="closeClick(true)">确定</button>
      <button type="button" matdialogclose mat-button (click)="closeClick(false)">取消</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  content = '';
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  closeClick(result: boolean) {
    this.dialogRef.close(result);
  }
}
