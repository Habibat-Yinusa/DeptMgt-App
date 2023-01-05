import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss'],
})
// @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
export class ViewCoursesComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'unit', 'lecturer', 'students'];
  courses: any;
  dataSource: any;
  tableSource: any;
  levelArrayFromStorage: any[] = [];
  currentLevel: any;
  constructor(
    private dialogref: MatDialogRef<ViewCoursesComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    let levels = localStorage.getItem('levels');
    if (levels) {
      this.levelArrayFromStorage = JSON.parse(levels);
      console.log(this.levelArrayFromStorage);

      this.currentLevel = this.levelArrayFromStorage.forEach((el) => {
        return el.level;
      });
      console.log(this.currentLevel, 'currentlevel');
    }

    let tableData = localStorage.getItem('datasource');
    if (tableData) {
      this.tableSource = JSON.parse(tableData);
      this.dataSource = new MatTableDataSource<any>(this.tableSource);
    }
  }
  close() {
    this.dialogref.close();
  }
}
