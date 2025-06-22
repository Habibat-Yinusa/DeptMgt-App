import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalCourses = 0;
  totalLecturers = 0;
  totalUsers = 0;
  totalLevels = 0;

  displayedColumns: string[] = ['activity', 'date'];
  recentActivities = [
    { activity: 'New course "MAT 101" added', date: '2025-06-21' },
    { activity: 'Lecturer "Dr. Smith" added', date: '2025-06-20' },
    { activity: 'Timetable updated for 200 Level', date: '2025-06-19' },
  ];

  constructor(private app: DataService) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.app.getDashboardStats().subscribe({
      next: (res) => {
        this.totalCourses = res.totalCourses;
        this.totalLecturers = res.totalLecturers;
        this.totalUsers = res.totalUsers;
        this.totalLevels = res.totalLevels;
      },
      error: (err) => {
        console.error('Error loading dashboard stats:', err);
      }
    });
  }
}
