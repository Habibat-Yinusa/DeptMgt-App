import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/api/data.service';
import { newCourse } from 'src/app/model/data';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = [
    'code',
    'name',
    'level',
    'unit',
    'lecturer',
    'students',
    'delete',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  courses: any[] = [];
  editId: any;
  isEdit: boolean = false;
  editItem: any;
  id: string = '';
  levelFilter: any;
  lecturerFilter: any;
  levels: any;
  lecturerList: any[] = [];
  payload = new newCourse();

  constructor(private dialog: MatDialog, private app: DataService) {}
  ngOnInit(): void {
    this.getCourses();
    this.dataSource = new MatTableDataSource(this.courses);
    let fromStorage = localStorage.getItem('courses');
    if (fromStorage) {
      this.courses = JSON.parse(fromStorage);
      this.dataSource = new MatTableDataSource(this.courses);
      // this.dataSource.paginator = this.paginator;
    }

    let levels = localStorage.getItem('levels');
    if (levels) {
      this.levels = JSON.parse(levels);
    }

    let lect = localStorage.getItem('lecturerList');
    if (lect) {
      this.lecturerList = JSON.parse(lect);
    }
  }

  getCourses() {
    this.app.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  registerCourse() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;
    this.dialog
      .open(AddCourseComponent, dialogConfig)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.payload.code = res.value.code;
          this.payload.name = res.value.name;
          this.payload.unit = res.value.unit;
          this.payload.level = res.value.level;
          this.payload.lecturer = res.value.lecturer;
          this.payload.student_no = res.value.students;

          this.app.postCourse(this.payload).subscribe({
            next: (res) => {
              this.getCourses();
            },
          });

          // this.courses.push(res.value);
          console.log(this.courses, 'what i sent');
          // this.dataSource = new MatTableDataSource(this.courses);
          // this.dataSource.paginator = this.paginator;
          localStorage.setItem('courses', JSON.stringify(this.courses));
        }
      });
  }

  filterbyLevel(val: any) {
    let fromStorage = localStorage.getItem('courses');
    if (fromStorage) {
      this.courses = JSON.parse(fromStorage);
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
    }

    if (val != 'all') {
      this.courses = this.courses.filter((el) => el.level == val);
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
    }
  }
  filterbyLecturer(val: any) {
    let fromStorage = localStorage.getItem('courses');

    if (fromStorage) {
      this.courses = JSON.parse(fromStorage);
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
    }

    if (val != 'all') {
      console.log(val, 'val');

      this.courses = this.courses.filter((el) => el.lecturer == val);
      console.log(this.courses, 'course');

      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
    }
  }

  delete(id: any) {
    // alert('are you sure you want to delete this course?');
    this.courses.splice(id, 1);
    this.dataSource = new MatTableDataSource(this.courses);
    this.dataSource.paginator = this.paginator;
    localStorage.setItem('courses', JSON.stringify(this.courses));
  }

  edit(Id: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;
    // dialogConfig.data = data;
    this.app.getSingleCourses(Id).subscribe({
      next: (res) => {
        dialogConfig.data = res;
        console.log(dialogConfig.data, 'dialog data');
        this.dialog
          .open(EditCourseComponent, dialogConfig)
          .afterClosed()
          .subscribe((res: any) => {
            this.payload.code = ' ';
            this.payload.name = ' ';
            this.payload.unit = ' ';
            this.payload.level = 0;
            this.payload.lecturer = ' ';
            this.payload.student_no = ' ';

            this.getCourses();
            console.log('edit successful');

            // if (res) {
            //   for (let i = 0; i < this.courses.length; i++) {
            //     if (this.courses[i].id == res.value.id) {
            //       this.courses[i] = res.value;
            //     }
            //   }
            //   console.log(this.courses, 'all list');

            //   this.dataSource = new MatTableDataSource(this.courses);
            //   this.dataSource.paginator = this.paginator;
            //   localStorage.setItem('courses', JSON.stringify(this.courses));
            // }
          });
      },
    });
  }

  search(val: string) {
    this.dataSource.filter = val;
  }
}
