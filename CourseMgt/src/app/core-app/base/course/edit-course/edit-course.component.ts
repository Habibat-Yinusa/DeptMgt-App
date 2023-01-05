import { newCourse } from './../../../../model/data';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  form: FormGroup;
  levels: any;
  editedForm: any;
  lecturerList: any;
  payload = new newCourse();
  // levelStorage: any;
  constructor(
    private dialogref: MatDialogRef<EditCourseComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: DataService
  ) {
    this.form = this.fb.group({
      code: [this.data.Course_code, Validators.required],
      name: [this.data.Course_name, Validators.required],
      level: [this.data.Level.toString(), Validators.required],
      unit: [this.data.Credit_unit, Validators.required],
      lecturer: [this.data.Lecturer, Validators.required],
      students: [this.data.Students_No, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getGroup();
    this.getlevels();

    // let levels = localStorage.getItem('levels');
    // if (levels) {
    //   this.levels = JSON.parse(levels);
    // }
    // let lecturerList = localStorage.getItem('lecturerList');
    // if (lecturerList) {
    //   this.lecturerList = JSON.parse(lecturerList);
    // }

    // if (this.data) {
    //   this.setData();
    // }
    // else {
    //   this.setId();
    // }
  }
  // GET LECTURERS FROM DATABASE
  getGroup() {
    this.app.getLecturer().subscribe({
      next: (res) => {
        this.lecturerList = res;
        console.log('from db', this.lecturerList);
      },
      error: (err) => {},
    });
  }

  // GET LEVLS FROM DATABASE
  getlevels() {
    this.app.getLevels().subscribe({
      next: (res) => {
        this.levels = res;
        // this.form.get('level')?.setValue(this.data.Level);
        console.log(this.levels, 'levelArray');
      },
    });
  }

  // setId() {
  //   let id = Math.random() * 99999999;
  //   this.form.get('id')?.setValue(id.toString());
  // }

  setData() {
    this.form.get('name')?.setValue(this.data.name);
    this.form.get('id')?.setValue(this.data.id);
    this.form.get('code')?.setValue(this.data.code);
    this.form.get('level')?.setValue(this.data.level);
    this.form.get('unit')?.setValue(this.data.unit);
    this.form.get('lecturer')?.setValue(this.data.lecturer);
    this.form.get('students')?.setValue(this.data.students);

    // this.form.value.id = this.data.id;
    // this.form.value.code = this.data.code;
    // this.form.value.name = this.data.name;
    // this.form.value.level = this.data.level;
    // this.form.value.unit = this.data.unit;
    // this.form.value.lecturer = this.data.lecturer;
    // this.form.value.students = this.data.students;
  }
  search(val: string) {
    this.lecturerList.filter = val;
  }

  save(Id: any) {
    this.payload.name = this.form.get('name')?.value;
    this.payload.code = this.form.get('code')?.value;
    this.payload.unit = this.form.get('unit')?.value;
    this.payload.level = this.form.get('level')?.value;
    this.payload.lecturer = this.form.get('lecturer')?.value;
    this.payload.student_no = this.form.get('students')?.value;

    console.log(this.payload, 'edited payload');
    this.app.editCourse(this.payload, Id).subscribe({
      next: (res) => {
        this.dialogref.close(this.form);
      },
    });
  }
  close() {
    this.dialogref.close();
  }
}
