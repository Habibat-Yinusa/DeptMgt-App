import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  form: FormGroup;
  levels: any;
  editedForm: any;
  lecturerList: any;
  // levelStorage: any;
  constructor(
    private dialogref: MatDialogRef<AddCourseComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: DataService
  ) {
    this.form = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      level: ['', Validators.required],
      unit: ['', Validators.required],
      lecturer: ['', Validators.required],
      students: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getGroup();
    this.getlevels();

    let levels = localStorage.getItem('levels');
    if (levels) {
      this.levels = JSON.parse(levels);
    }
    let lecturerList = localStorage.getItem('lecturerList');
    if (lecturerList) {
      this.lecturerList = JSON.parse(lecturerList);
    }

    if (this.data) {
      this.setData();
    } else {
      this.setId();
    }
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

        console.log(this.levels, 'levelArray');
      },
    });
  }

  setId() {
    let id = Math.random() * 99999999;
    this.form.get('id')?.setValue(id.toString());
  }

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

  save() {
    this.dialogref.close(this.form);
  }
  close() {
    this.dialogref.close();
  }
}
