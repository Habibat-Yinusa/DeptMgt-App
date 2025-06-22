import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CourseComponent } from './course/course.component';
import { LevelComponent } from './level/level.component';
import { BaseComponent } from './base.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddCourseComponent } from './course/add-course/add-course.component';
// import {Component} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import { BaseRoutingModule } from './base-routing.module';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { TimetableComponent } from './timetable/timetable.component';
import CatalogueComponent from './catalogue/catalogue.component';
import { AddLecturerComponent } from './catalogue/add-lecturer/add-lecturer.component';
import { ViewCoursesComponent } from './level/view-courses/view-courses.component';
import { EditLecturerComponent } from './catalogue/edit-lecturer/edit-lecturer.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingButtonComponent } from '../../shared/loading-button/loading-button.component'
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    LevelComponent,
    CourseComponent,
    AddCourseComponent,
    DashboardComponent,
    ReportComponent,
    TimetableComponent,
    CatalogueComponent,
    AddLecturerComponent,
    ViewCoursesComponent,
    EditLecturerComponent,
    EditCourseComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    DragDropModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule,
    // MAT_DIALOG_DATA
    // FlatTreeControl,
    // MatTreeFlatDataSource,
    // MatTreeFlattener
],
})
export class BaseModule {}
