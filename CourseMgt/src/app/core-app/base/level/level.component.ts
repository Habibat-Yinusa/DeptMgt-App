import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/api/data.service';
import { level } from 'src/app/model/data';
import { ViewCoursesComponent } from './view-courses/view-courses.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})

// @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
export class LevelComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  level: any;
  LA: any;
  // id: number = 0;
  levelArray: any[] = [];
  form: FormGroup;
  courses: any[] = [];
  payload = new level();
  levelDetails = { level: '', adviser: '' };
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private app: DataService
  ) {
    this.form = this.fb.group({
      level: [, Validators.required],
      LA: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getlevels();
    let fromStorage = localStorage.getItem('levels');
    if (fromStorage) {
      this.levelArray = JSON.parse(fromStorage);
    }
  }

  submit() {
    console.log(this.form.value);
    // this.levelDetails.id = this.id++;

    // this.levelDetails.level = this.form.value.level;
    // this.levelDetails.adviser = this.form.value.LA;

    // this.levelArray.push(this.levelDetails);
    // localStorage.setItem('levels', JSON.stringify(this.levelArray));

    // console.log(this.levelArray);
    this.payload.level = this.form.value.level;
    this.payload.levelAdviser = this.form.value.LA;
    this.app.postLevel(this.payload).subscribe({
      next: (res) => {
        this.getlevels();
      },
    });

    this.form.reset();
    this.reset();
    console.log(this.levelDetails);
  }

  getlevels() {
    this.app.getLevels().subscribe({
      next: (res) => {
        this.levelArray = res;
        // console.log(this.levelDetails, 'levelDetails');
        // this.levelArray.push(this.levelDetails);
        console.log(this.levelArray, 'levelArray');
      },
    });
  }

  reset() {
    this.levelDetails = { level: '', adviser: '' };

    // this.form.value.level = '';
    // this.form.value.LA = '';
  }

  delete(i: number) {
    this.levelArray.splice(i, 1);
    localStorage.setItem('levels', JSON.stringify(this.levelArray));
  }

  viewCourse(Id: number) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;
    // dialogConfig.data = val;

    this.app.getLevelCourse(Id).subscribe({
      next: (res) => {
        dialogConfig.data = res;
      },
    });
    this.dialog
      .open(ViewCoursesComponent, dialogConfig)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          console.log('successful!');

          // this.courses.push(res.value);
          // console.log(this.courses, 'what i sent');
          // this.dataSource = new MatTableDataSource(this.courses);
          // this.dataSource.paginator = this.paginator;
          // localStorage.setItem('courses', JSON.stringify(this.courses));
        }
      });
    let fromStorage = localStorage.getItem('courses');
    if (fromStorage) {
      this.courses = JSON.parse(fromStorage);

      // if (val) {
      //   this.courses = this.courses.filter((el) => el.level == val);
      //   console.log(this.courses, 'course');
      //   // this.dataSource = new MatTableDataSource(this.courses);
      //   localStorage.setItem('datasource', JSON.stringify(this.courses));
      //   // this.dataSource.paginator = this.paginator;
      // }
    }
  }
}
