import { DataService } from './../../../api/data.service';
import { AppService } from './../../../app.service';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  levelList: any[] = [];
  levelCourses: any[] = [];
  registered: any[] = [];
  todo: any[] = [];
  courseCode: any;
  groupList: any;
  constructor(private app: DataService) {}

  done: any[] = [
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
  ];

  // done = ;
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  // todo = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  ngOnInit(): void {
    let fromStorage = localStorage.getItem('levels');
    if (fromStorage) {
      this.levelList = JSON.parse(fromStorage);
    }
    let courseFromStorage = localStorage.getItem('courses');
    if (courseFromStorage) {
      this.levelCourses = JSON.parse(courseFromStorage);

      this.levelCourses.forEach((element) => {
        this.courseCode = element.code;
        this.todo.push(this.courseCode);
        // this.done.push(this.courseCode);0
      });
      console.log(this.todo, 'todo');

      // this.levelCourses.filter((el) => el.level == level.level);
    }
  }

  // getGroup() {
  //   this.app.getGroup(2).subscribe({
  //     next: (res) => {
  //       this.groupList = res;
  //     },
  //     error: (err) => {},
  //   });
  // }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  timetable(val: any) {
    this.levelCourses.forEach((element) => {
      if (val == element.level) {
        this.courseCode = element.code;
        this.todo.push(this.courseCode);
        console.log(this.todo, 'todo');
      }
    });
  }
}
