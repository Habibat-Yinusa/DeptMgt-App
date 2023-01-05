import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/api/data.service';
import { newLecturer } from 'src/app/model/data';

// import { MessageUtil, Util, Constants } from '../../helpers/utilities';
// import {  } from "module";

@Component({
  selector: 'app-add-lecturer',
  templateUrl: './add-lecturer.component.html',
  styleUrls: ['./add-lecturer.component.scss'],
})
export class AddLecturerComponent implements OnInit {
  form: FormGroup;
  payload = new newLecturer();
  loading: boolean | undefined;
  error: any;
  constructor(
    private dialogref: MatDialogRef<AddLecturerComponent>,
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

  ngOnInit(): void {
    if (this.data) {
      this.setData();
    }
  }

  setData() {
    this.form.get('title')!.setValue(this.data.Title);
    this.form.get('fname')!.setValue(this.data.First_name);
    this.form.get('mname')!.setValue(this.data.Middle_name);
    this.form.get('lname')!.setValue(this.data.Last_name);
  }

  save() {
    // const form = this.form.value;
    // console.log(form, 'lecturer');

    // this.payload.title = form.title;
    // this.payload.firstname = form.fname;
    // this.payload.middlename = form.mname;
    // this.payload.lastname = form.lname;

    this.dialogref.close(this.form);
  }
  close() {
    this.dialogref.close();
  }
}
