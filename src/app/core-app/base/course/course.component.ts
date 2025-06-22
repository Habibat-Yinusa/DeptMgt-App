import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/api/data.service';
import { newCourse } from 'src/app/model/data';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = [
    'courseCode', 'courseName','level', 'creditUnit', 'lecturer', 'students', 'delete'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  courses: any[] = [
    // { Course_Name: 'Maths Introduction', Course_Code: 'MAT 101', Level: 300, Credit_Unit: 3, Lecturer: 'Mubeen Habibat', Students_No: 20 },
    // { Course_Name: 'Maths Introduction', Course_Code: 'MAT 101', Level: 300, Credit_Unit: 3, Lecturer: 'Mubeen Habibat', Students_No: 20 },
    // { Course_Name: 'Maths Introduction', Course_Code: 'MAT 101', Level: 300, Credit_Unit: 3, Lecturer: 'Mubeen Habibat', Students_No: 20 },
  ];
  editId: any;
  isEdit: boolean = false;
  editItem: any;
  id: string = '';
  levelFilter: any;
  lecturerFilter: any;
  levels: any;
  lecturerList: any[] = [];
  payload = new newCourse();
  loading: boolean = false;

  constructor(private dialog: MatDialog, private app: DataService, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    this.getCourses();
    this.getlevels();
    this.getGroup();
  }

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

  getCourses() {
    this.dataSource = new MatTableDataSource(this.courses);
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
          this.loading = true;
          this.payload.courseCode = res.code;
          this.payload.courseName = res.name;
          this.payload.creditUnit = res.unit;
          this.payload.level = res.level;
          this.payload.lecturer = res.lecturer;
          this.payload.studentsNo = res.students;

          console.log(this.payload, 'payload');

          this.app.postCourse(this.payload).subscribe({
            next: (res) => {
              this.getCourses();
              this.loading = false;
              this.snackbar.open(res.message, 'Dismiss', {
                duration: 4000
              })
              localStorage.setItem('courses', JSON.stringify(this.courses));
            },
          });
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
      this.courses = this.courses.filter((el) => el.level.level == val);
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


  edit(Id: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;

    this.app.getSingleCourses(Id).subscribe({
        next: (res) => {
            dialogConfig.data = res;

            this.dialog
                .open(EditCourseComponent, dialogConfig)
                .afterClosed()
                .subscribe((result: any) => {
                    if (result) {
                        this.getCourses();
                    }
                });
        },
        error: (err) => {
            console.error('Error fetching course:', err);
        },
    });
}


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


  //DELETE A COURSE
  delete(Id: any) {
    this.app.deleteCourse(Id).subscribe(
      (res) => {
        console.log(res);

        this.snackbar.open(res.message, 'Dismiss', {
          duration: 4000
        })
        this.getCourses()
      }
    )
  }

  search(val: string) {
    this.dataSource.filter = val;
  }
}
