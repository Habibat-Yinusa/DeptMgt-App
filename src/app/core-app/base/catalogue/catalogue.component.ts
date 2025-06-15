import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { newLecturer } from './../../../model/data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { DataService } from './../../../api/data.service';
import { EditLecturerComponent } from './edit-lecturer/edit-lecturer.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export default class CatalogueComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'firstname',
    'middlename',
    'lastname',
    'btn',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  menu: string = 'Lecturers';
  defaultImage: string = 'assets/user_icon-removebg-preview.png';
  profilePic: any;
  // lecturerList: any[] = [];
  userInfo: any;
  groupList: any[] = [
    { Title: 'Mr', First_name: 'Mubeen', Middle_name: 'Akin', Last_name: 'Akimbola' },
    { Title: 'Mr', First_name: 'Mubeen', Middle_name: 'Akin', Last_name: 'Akimbola' },
    { Title: 'Mr', First_name: 'Mubeen', Middle_name: 'Akin', Last_name: 'Akimbola' },
    { Title: 'Mr', First_name: 'Mubeen', Middle_name: 'Akin', Last_name: 'Akimbola' },
  ];
  payload = new newLecturer();
  lecturers: any;
  successMsg: any;
  constructor(private dialog: MatDialog, private app: DataService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getGroup();
    // this.registerLecturer();

    // let fromStorage = localStorage.getItem('lecturerList');
    // if (fromStorage) {
    //   this.lecturerList = JSON.parse(fromStorage);
    //   this.dataSource = new MatTableDataSource(this.lecturerList);
    //   this.dataSource.paginator = this.paginator;
    // }

    //user profile
    let userDetails = localStorage.getItem('loggedUser');
    if (userDetails) {
      this.userInfo = JSON.parse(userDetails);
      console.log(this.userInfo, 'loggedin user');
    }

    // this.form.get('name')?.setValue(this.data.name);
    // this.form.get('id')?.setValue(this.data.id);
    // this.form.get('code')?.setValue(this.data.code);
    // this.form.get('level')?.setValue(this.data.level);
    // this.form.get('unit')?.setValue(this.data.unit);
    // this.form.get('lecturer')?.setValue(this.data.lecturer);
    // this.form.get('students')?.setValue(this.data.students);

    this.dataSource = new MatTableDataSource(this.groupList);
  }

  //LECTURERS
  getGroup() {
    this.app.getLecturer().subscribe({
      next: (res) => {
        this.groupList = res;
        this.dataSource = new MatTableDataSource(this.groupList);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => { },
    });
  }

  registerLecturer() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '30%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;
    this.dialog
      .open(AddLecturerComponent, dialogConfig)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.payload.title = res.value.title;
          this.payload.firstname = res.value.fname;
          this.payload.middlename = res.value.mname;
          this.payload.lastname = res.value.lname;

          console.log(this.payload, 'payload');
          this.app.postLecturer(this.payload).subscribe({
            next: (res) => {
              console.log(res);
              this.getGroup();

              this.snackbar.open(res.message, 'Dismiss', { duration: 4000 })
            },
          });
        }
      });
    // this.dataSource = new MatTableDataSource(this.groupList);
  }

  editLecturer(id: any) {

    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '30%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;

    this.app.getSingleLecturer(id).subscribe({
      next: (res) => {
        dialogConfig.data = res[0];

        this.dialog
          .open(AddLecturerComponent, dialogConfig)
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {

              this.payload.title = res.value.title;
              this.payload.firstname = res.value.fname;
              this.payload.middlename = res.value.mname;
              this.payload.lastname = res.value.lname;
              this.app.editLecturer(id, this.payload).subscribe({
                next: (res) => {
                  this.getGroup();
                  this.snackbar.open(res.message, 'Dismiss', {
                    duration: 4000
                  })
                },
              });
            }
          });
      },
    });
  }

  // delete(id: any) {
  //   // alert('are you sure you want to delete this course?');
  //   this.groupList.splice(id, 1);
  //   this.dataSource = new MatTableDataSource(this.groupList);
  //   this.dataSource.paginator = this.paginator;
  //   // localStorage.setItem('groupList', JSON.stringify(this.groupList));
  // }

  delete(id: number) {
    this.app.deleteLecturer(id).subscribe(
      (res) => {
        console.log(res.message);
        this.successMsg = res.message;
        console.log(this.successMsg);

        this.snackbar.open(res.message, 'Dismiss', {
          duration: 4000
        })
        this.getGroup()
        // console.log(res.message, 'msg');


      })
  }

  search(val: string) {
    this.dataSource.filter = val;
  }

  // userprofile() {
  //   let container = document.querySelector(
  //     '.right-container'
  //   ) as HTMLDivElement;
  //   if (this.menu == 'user-profile') {
  //     container.style.width = '60%';
  //     container.style.height = '65vh';
  //   } else {
  //     if (this.menu == 'password') {
  //       container.style.width = '40%';
  //       container.style.height = '65vh';
  //     }
  //   }
  // }

  //USER PROFILE
  picture() {
    let selectedImg = document.getElementById('myFile') as HTMLInputElement;
    if (selectedImg) {
      (document.getElementById('profile-pic') as HTMLInputElement) ==
        selectedImg;
    }
  }

  upload(event: any) {
    let pic = event.target.files[0];

    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.profilePic = reader.result;
    });
    reader.readAsDataURL(pic);
  }
}
