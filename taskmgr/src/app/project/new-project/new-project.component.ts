import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {

  title = '';
  thumbnails$: Observable<string[]>;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) {
    this.thumbnails$ = data.thumbnails;
  }

  ngOnInit() {
    if (this.data.project) {
      this.title = '编辑项目';
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
    } else {
      this.title = '创建项目';
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [''],
        coverImg: [this.data.img]
      });
    }
    console.log(JSON.stringify(this.data.project));
  }

  onSaveClick({value, valid}, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({name: value.name, desc: value.desc ? value.desc : null, coverImg: value.coverImg});
  }

  closeClick() {
    this.dialogRef.close();
  }
}
