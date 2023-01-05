import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/api/data.service';
import { newLecturer } from 'src/app/model/data';

@Component({
  selector: 'app-edit-lecturer',
  templateUrl: './edit-lecturer.component.html',
  styleUrls: ['./edit-lecturer.component.scss'],
})
export class EditLecturerComponent implements OnInit {
  form: FormGroup;
  payload = new newLecturer();
  loading: boolean | undefined;
  error: any;
  constructor(
    private dialogref: MatDialogRef<EditLecturerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: DataService
  ) {
    this.form = this.fb.group({
      title: [''],
      fname: [''],
      mname: [''],
      lname: [''],
    });
  }

  ngOnInit(): void {}
  save() {
    this.dialogref.close(this.form);
  }

  close() {
    this.dialogref.close();
  }
}
