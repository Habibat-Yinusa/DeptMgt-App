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
    'firstName',
    'middleName',
    'lastName',
    'btn',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  menu: string = 'Lecturers';
  defaultImage: string = 'assets/user_icon-removebg-preview.png';
  profilePic: any;
  // lecturerList: any[] = [];
  userInfo: any;
  groupList: any[] = [];
  payload = new newLecturer();
  lecturers: any;
  successMsg: any;
  loading: boolean = false;
  constructor(private dialog: MatDialog, private app: DataService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getGroup();

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
      this.dataSource.data = this.groupList;  // instead of new MatTableDataSource()
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
        this.getGroup();
        this.snackbar.open('Lecturer added successfully.', 'Dismiss', {
          duration: 4000
        });
      }
    });
}

  editLecturer(lecturerId: string) {

    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '30%';
    dialogConfig.minHeight = '30vh';
    dialogConfig.disableClose = false;

    this.app.getSingleLecturer(lecturerId).subscribe({
      next: (res) => {
        dialogConfig.data = res;
        this.dialog
          .open(EditLecturerComponent, dialogConfig)
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {

              this.payload.title = res.value.title;
              this.payload.firstName = res.value.firstName;
              this.payload.middleName = res.value.middleName;
              this.payload.lastName = res.value.lastName;
              this.app.editLecturer(lecturerId, this.payload).subscribe({
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

  delete(id: string) {
    this.app.deleteLecturer(id).subscribe(
      (res) => {
        this.snackbar.open(res.message, 'Dismiss', {
          duration: 4000
        })
        this.getGroup()


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

  updateUser(id: string) {
    this.loading = true;
  const payload = {
    userName: this.userInfo.user.userName,
    firstName: this.userInfo.user.firstName,
    middleName: this.userInfo.user.middleName,
    lastName: this.userInfo.user.lastName,
    email: this.userInfo.user.email,
    department: this.userInfo.user.department,
    faculty: this.userInfo.user.faculty,
  };

  this.app.editUser(id, payload).subscribe({
    next: (res) => {
      const updatedUser = { ...this.userInfo.user, ...payload };
      localStorage.setItem('loggedUser', JSON.stringify({ user: updatedUser }));
      this.loading = false;
      this.snackbar.open(res.message, 'Dismiss', {
        duration: 4000
      });
      window.location.reload();
    },
    error: (err) => {
      console.error('Error updating user:', err);
      this.snackbar.open(err.error?.message || 'Error updating user', 'Dismiss', {
        duration: 4000
      });
    },
  });
}

}

