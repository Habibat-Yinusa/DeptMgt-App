import { level } from './../../../model/data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/api/data.service';
// import { level } from 'src/app/model/data';
import { ViewCoursesComponent } from './view-courses/view-courses.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})

// @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
export class LevelComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  LA: any;
  levelArray: any[] = [];
  levels: string[] = ['100', '200', '300', '400', '500', '600', '700'];
  chips: string[] = ['ABC 101', 'DEF 102', 'GHI 103', 'JKL 104', 'MNO 105']
  // chips: string[] = []
  form: FormGroup;
  courses: any[] = [];
  payload = new level();
  levelDetails = { level: '', adviser: '' };
  errmsg: any;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private app: DataService
  ) {
    this.form = this.fb.group({
      level: ['', Validators.required],
      LA: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getlevels();
  }

  submit() {
    this.loading =true
    this.payload = new level();
    this.payload.level = this.form.value.level;
    this.payload.levelAdviser = this.form.value.LA;
    this.levelArray.push(this.payload)

    this.app.postLevel(this.payload).subscribe({
      next: (res) => {
        this.getlevels();
        this.loading = false;
      },
      error: (err) => {
        this.errmsg = err.error.text;
        setTimeout(() => {
          this.errmsg = ''
        }, (5000))
      }
    });

    this.form.reset();
    this.reset();
  }

  getlevels() {
  this.app.getLevels().subscribe({
    next: (res) => {
      this.levelArray = res;

      this.levelArray.forEach((level) => {
        this.app.getLevelCourses(level.levelId).subscribe({
          next: (courses) => {
            level.courses = courses;
          },
          error: (err) => {
            console.log('Error loading courses for level', level.levelId, err);
            level.courses = [];
          }
        });
      });
    },
    error: (err) => {
      console.log('Error loading levels', err);
    }
  });
}


  reset() {
    this.levelDetails = { level: '', adviser: '' };


  }

  // delete(i: number) {
  //   this.levelArray.splice(i, 1);
  //   localStorage.setItem('levels', JSON.stringify(this.levelArray));
  // }
  delete(id: string) {
    this.app.deleteLevel(id).subscribe(
      res => {
        this.getlevels();
      }
    )
  }

  viewCourse(levelId: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '50%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;

    this.app.getLevelCourses(levelId).subscribe({
      next: (res) => {
        dialogConfig.data = res;

        this.dialog
          .open(ViewCoursesComponent, dialogConfig)
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
              console.log('successful!');

            }
          });
      },
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
