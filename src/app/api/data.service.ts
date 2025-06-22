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
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({ providedIn: 'root' })
export class DataService {
  // payload = new newLecturer();

  constructor(private http: HttpClient) {}

  private testurl = environment.ApiUrl;

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
    .post<any>(this.testurl + '/users/signup', payload)
    .pipe(catchError((err) => this.errorHandler(err)));
  }

  editUser(id: string, payload: any): Observable<any> {
    return this.http.put<any>(this.testurl + `/users/${id}`, payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }



  // lecturer details
  getLecturer(): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/lecturers`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  getSingleLecturer(lecturerId: string): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/lecturers/${lecturerId}`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  postLecturer(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/lecturers', payload, {
        headers: headers,
      })
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  editLecturer(id: string, payload: any): Observable<any> {
    return this.http
      .put<any>(this.testurl + `/lecturers/${id}`, payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  deleteLecturer(id: string):Observable<any> {
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
  getLevelCourses(levelId: string): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/levels/${levelId}`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  deleteLevel(id: string): Observable<any> {
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
  getSingleCourses(id: string): Observable<any> {
    return this.http
      .get<any>(this.testurl + `/courses/${id}`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  postCourse(payload: any): Observable<any> {
    return this.http
      .post<any>(this.testurl + '/courses', payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  editCourse(id: string, payload: any,): Observable<any> {
    return this.http
      .put<any>(this.testurl + `/courses/${id}`, payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  deleteCourse( id:string): Observable<any> {
    return this.http
    .delete<any>(this.testurl + `/courses/${id}`)
    .pipe(catchError((err) => this.errorHandler(err)))
  }

  getDashboardStats() {
  return this.http.get<any>(`${this.testurl}/courses/dashboard`);
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error || 'Server Error');
  }
}
