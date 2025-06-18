import { MatSnackBar } from '@angular/material/snack-bar';
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
    private app: DataService, private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({


      code: [this.data.courseCode, Validators.required],
      name: [this.data.courseName, Validators.required],
      level: [this.data.level, Validators.required],
      unit: [this.data.creditUnit, Validators.required],
      lecturer: [this.data.lecturer, Validators.required],
      students: [this.data.studentsNo, Validators.required],
    });

  }

  ngOnInit(): void {
    this.getGroup();
    this.getlevels();

  }
  // GET LECTURERS FROM DATABASE
  getGroup() {
    this.app.getLecturer().subscribe({
      next: (res) => {
        this.lecturerList = res;
      },
      error: (err) => {},
    });
  }

  // GET LEVLS FROM DATABASE
  getlevels() {
    this.app.getLevels().subscribe({
      next: (res) => {
        this.levels = res;

      },
    });
  }

  setData() {
    this.form.get('name')?.setValue(this.data.courseName);
    this.form.get('id')?.setValue(this.data.courseId);
    this.form.get('code')?.setValue(this.data.courseCode);
    this.form.get('level')?.setValue(this.data.level.level);
    this.form.get('unit')?.setValue(this.data.creditUnit);
    this.form.get('lecturer')?.setValue(this.data.lecturer);
    this.form.get('students')?.setValue(this.data.studentsNo);

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
    this.payload.courseName = this.form.get('name')?.value;
    this.payload.courseCode = this.form.get('code')?.value;
    this.payload.creditUnit = this.form.get('unit')?.value;
    this.payload.level = this.form.get('level')?.value;
    this.payload.lecturer = this.form.get('lecturer')?.value;
    this.payload.studentsNo = this.form.get('students')?.value;

    this.app.editCourse(this.payload, Id).subscribe({
      next: (res) => {
        this.dialogref.close(this.form);
        this.snackbar.open(res.message, 'Dismiss', {
          duration: 4000
        })

      },
    });
  }
  close() {
    this.dialogref.close();
  }
}
