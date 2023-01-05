import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { ViewCoursesComponent } from './level/view-courses/view-courses.component';
import { AddLecturerComponent } from './catalogue/add-lecturer/add-lecturer.component';
import CatalogueComponent from './catalogue/catalogue.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseComponent } from './course/course.component';
import { LevelComponent } from './level/level.component';
import { BaseComponent } from './base.component';
import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EditLecturerComponent } from './catalogue/edit-lecturer/edit-lecturer.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'level',
      },
      {
        path: 'level',
        component: LevelComponent,
        children: [
          {
            path: 'view-course',
            component: ViewCoursesComponent,
          },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'timetable',
        component: TimetableComponent,
      },
      {
        path: 'catalogue',
        component: CatalogueComponent,
        children: [
          {
            path: 'addlecturer',
            component: AddLecturerComponent,
          },
          {
            path: 'editlecturer',
            component: EditLecturerComponent,
          },
        ],
      },

      {
        path: 'course',
        component: CourseComponent,
        children: [
          {
            path: 'addcourse',
            component: AddCourseComponent,
          },
          {
            path: 'editcourse',
            component: EditCourseComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
