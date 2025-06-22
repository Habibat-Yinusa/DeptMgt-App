import { DataService } from './../../../api/data.service';
import { AppService } from './../../../app.service';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TIME_TABLE } from './timetable-config';
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
  days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  times = ['9:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00pm'];
  timeTable = TIME_TABLE;
  constructor(private app: DataService) { }

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
     const storedTimeTable = localStorage.getItem('timeTable');

    if (storedTimeTable) {
      // Load from localStorage
      this.timeTable = JSON.parse(storedTimeTable);
      console.log('Loaded timetable from storage:', this.timeTable);
    } else {
      // If no storage, use default TIME_TABLE
      this.timeTable = TIME_TABLE;
    }

  this.app.getCourses().subscribe({
    next: (res) => {
      this.levelCourses = res;

      this.levelCourses.forEach((course) => {
        course.dot = this.getRandomColor();
        this.courseCode = course.courseCode;
        this.todo.push(this.courseCode);
      });

      const saved = localStorage.getItem('savedTimetable');
      if (saved) {
        this.timeTable = JSON.parse(saved);
         this.removeCoursesInTimetableFromLevelCourses();
      }
    },
    error: (err) => {
      console.error('Error fetching courses:', err);
    },
  });
}

getRandomColor(): string {
  const colors = ['#000077', '#007700', '#b70000', '#faad1f', '#aa00ff', '#ff0066'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

removeCoursesInTimetableFromLevelCourses() {
  const droppedCoursesCodes: string[] = [];

  this.timeTable.forEach(slot => {
    slot.courses.forEach(course => {
      droppedCoursesCodes.push(course.courseCode);
    });
  });

  this.levelCourses = this.levelCourses.filter(course =>
    !droppedCoursesCodes.includes(course.courseCode)
  );
}



  ngAfterViewInit(): void {
    this.makeList()
    setTimeout(() => {
      this.resize()
    }, 2000);
  }

  resize() {
    const times: any = document.querySelectorAll('.times .time');
    const tabCards: any = document.querySelectorAll('.tab .tab-card');
    tabCards.forEach((card: any, index: number) => {
      if (index % 5 === 0) {
        const observer = new ResizeObserver(() => {
          // console.log(times[index / 5].offsetHeight - card.offsetHeight);
          const newHeight = card.offsetHeight;
          const currentTime = times[index / 5];
          if (!currentTime) return;
          const currentHeight = currentTime.offsetHeight;

          // Only apply the height if it's significantly different
          if (Math.abs(newHeight - currentHeight) > 30) {
            currentTime.style.height = `${newHeight}px`;
          }
        });
        observer.observe(card);
      }
    });
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

  addToTable(event: any) {
    // let dragged = course.previousContainer.data[course.previousIndex]
    // if (dragged) course.container.data.push(dragged)

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

    localStorage.setItem('savedTimetable', JSON.stringify(this.timeTable));
  }

  // backToList(item: any) {
  //   console.log(item, 'bringing');
  // }

  backToList(event: CdkDragDrop<any[]>) {
    console.log(event, 'bringing');
    const droppedItem = event.item.data;
    console.log(droppedItem, 'dropped item');
  }

 removeDroppedCourse(course: any, coursesArray: any[]) {
  const index = coursesArray.indexOf(course);
  if (index > -1) {
    coursesArray.splice(index, 1);

    const alreadyInList = this.levelCourses.find((c) => c.courseCode === course.courseCode);
    if (!alreadyInList) {
      this.levelCourses.push(course);
    }
    localStorage.setItem('timeTable', JSON.stringify(this.timeTable));
  }

}

  idlist: string[] = ['levelCourses']
  makeList() {
    let i = 0
    while (i < 45) {
      this.idlist.push('timeTable' + i)
      i++
    }
  }
}
