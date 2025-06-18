export class newLecturer {
  lecturerId?: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export class newUser {
  userId?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  department?: string;
  faculty?: string;
  password?: string;
  confirmPassword?: string;
}
export class checkUser {
  email?: string;
  password?: string;
}
export class lecturer {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}
export class level {
  level?: string;
  levelAdviser?: string;
}

export class newCourse {
  courseId?: string
  courseCode?: string
  courseName?: string
  creditUnit?: number
  level?: string
  lecturer?: string
  studentsNo?: number
}
