import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss'],
})
// @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
export class ViewCoursesComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'unit', 'lecturer', 'students'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private dialogref: MatDialogRef<ViewCoursesComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data, 'data');

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data)
  }


  close() {
    this.dialogref.close();
  }
}
