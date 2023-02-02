export class newLecturer {
  title?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
}

export class newUser {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  email?: string;
  department?: string;
  faculty?: string;
  password?: string;
  confirmpassword?: string;
}
export class checkUser {
  email?: string;
  password?: string;
}
export class lecturer {
  title?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
}
export class level {
  level?: string;
  levelAdviser?: string;
}

export class newCourse {
  code?: string;
  name?: string;
  unit?: string;
  level?: string;
  lecturer?: string;
  student_no?: string;
}
