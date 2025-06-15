import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { newLecturer } from 'src/app/model/data';
import { newUser } from './../model/data';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({ providedIn: 'root' })
export class DataService {
  // payload = new newLecturer();

  constructor(private http: HttpClient) {}

  private testurl = 'http://localhost:3000';

  //user details
  // getUsers(url:any, payload:any): Observable<any> {
  //   return this.http
  //     .post<any>(this.testurl + `${url}`, payload)
  //     .pipe(map(res => {
  //       return res;}), catchError((err) => this.errorHandler(err)));
  // }
  // getUsers(url: any, payload: any) {
  //   return this.http
  //     .post(`${this.testurl}${url}`, payload)
  //     .pipe(catchError((err) => this.errorHandler(err)));
  // }
  getUsers(): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/users`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  loginUser(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/users/login', payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  setUser(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/users', payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  // lecturer details
  getLecturer(): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/lecturers`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  getSingleLecturer(id: number): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/lecturers/${id}`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  postLecturer(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/lecturers', payload, {
        headers: headers,
      })
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  editLecturer(id: number, payload: any): Observable<any> {
    return this.http
      .put<any>(this.testurl + `/lecturers/${id}`, payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  deleteLecturer(id: number):Observable<any> {
    return this.http
    .delete<any>(this.testurl + `/lecturers/${id}`)
    .pipe(catchError((err) => this.errorHandler(err)))
  }

  //level details
  postLevel(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/levels', payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  getLevels(): Observable<any> {
    return this.http
      .get<any>(this.testurl + '/levels')
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  //to get all courses per level
  getLevelCourses(id: number): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/levels/${id}`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  deleteLevel(id: number): Observable<any> {
    return this.http
    .delete<any>(this.testurl + `/levels/${id}`)
    .pipe(catchError((err) => this.errorHandler(err)))
  }

  //   COURSE
  getCourses(): Observable<any> {
    return this.http
      .get<any>(this.testurl + '/courses')
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  getSingleCourses(id: number): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/courses/${id}`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  postCourse(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/courses', payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  editCourse(payload: any, id: number): Observable<any> {
    return this.http
      .put<any>(this.testurl + `/courses/${id}`, payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  deleteCourse( id:number): Observable<any> {
    return this.http
    .delete<any>(this.testurl + `/courses/${id}`)
    .pipe(catchError((err) => this.errorHandler(err)))
  }



  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error || 'Server Error');
  }
}
