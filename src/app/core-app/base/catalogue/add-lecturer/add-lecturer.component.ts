import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/api/data.service';
import { newLecturer } from 'src/app/model/data';

@Component({
  selector: 'app-add-lecturer',
  templateUrl: './add-lecturer.component.html',
  styleUrls: ['./add-lecturer.component.scss'],
})
export class AddLecturerComponent implements OnInit {
  form: FormGroup;
  payload = new newLecturer();
  loading: boolean = false;
  error: any;

  constructor(
    private dialogref: MatDialogRef<AddLecturerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: DataService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      fname: ['', Validators.required],
      mname: [''],
      lname: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.setData();
    }
  }

  setData() {
    this.form.get('title')!.setValue(this.data.title);
    this.form.get('fname')!.setValue(this.data.firstName);
    this.form.get('mname')!.setValue(this.data.middleName);
    this.form.get('lname')!.setValue(this.data.lastName);
  }

 save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const form = this.form.value;

  console.log('Form data:', form);

  this.payload.title = form.title;
  this.payload.firstName = form.fname;
  this.payload.middleName = form.mname;
  this.payload.lastName = form.lname;

  this.loading = true;

  this.app.postLecturer(this.payload).subscribe({
    next: (res) => {
      console.log('Lecturer added successfully:', res);
      this.loading = false;
      this.dialogref.close(true);
    },
    error: (err) => {
      this.loading = false;
      this.error = err;
      console.error('Error adding lecturer:', err);
    },
  });
}

close() {
  this.dialogref.close();
}
}
