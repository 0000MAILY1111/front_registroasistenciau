import type { Student, Teacher, Subject, AttendanceRecord, Semester } from "./types"

export const mockSemesters: Semester[] = [
  {
    id: "1",
    name: "2/2021",
    startDate: new Date("2021-08-01"),
    endDate: new Date("2021-12-15"),
    isActive: true,
  },
]

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "VALDEZ PAYLLO MAILY CELINA",
    email: "maily.valdez@universidad.edu",
    role: "student",
    registrationNumber: "219125041",
    career: "INGENIERIA EN SISTEMAS",
    semester: 2,
    enrolledSubjects: ["MAT202", "ECO300", "INF310", "INF312", "MAT302", "ADM320", "INF322"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockTeachers: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Carlos Mendoza",
    email: "carlos.mendoza@universidad.edu",
    role: "teacher",
    department: "Ingeniería",
    subjects: ["MAT202", "MAT302"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "t2",
    name: "Lic. Ana García",
    email: "ana.garcia@universidad.edu",
    role: "teacher",
    department: "Informática",
    subjects: ["INF310", "INF312", "INF322"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockSubjects: Subject[] = [
  {
    id: "s1",
    code: "MAT202",
    name: "Matemáticas II",
    teacherId: "t1",
    semester: 2,
    schedule: [
      { day: "tuesday", startTime: "09:15", endTime: "10:45", classroom: "SB" },
      { day: "thursday", startTime: "09:15", endTime: "10:45", classroom: "SB" },
    ],
    students: ["1"],
  },
  {
    id: "s2",
    code: "INF312",
    name: "Informática III",
    teacherId: "t2",
    semester: 2,
    schedule: [
      { day: "monday", startTime: "08:30", endTime: "10:00", classroom: "SA" },
      { day: "wednesday", startTime: "08:30", endTime: "10:00", classroom: "SA" },
      { day: "friday", startTime: "08:30", endTime: "10:00", classroom: "SA" },
    ],
    students: ["1"],
  },
]

export const mockAttendance: AttendanceRecord[] = [
  {
    id: "a1",
    studentId: "1",
    subjectId: "s1",
    date: new Date("2021-09-15"),
    status: "present",
    markedBy: "t1",
  },
  {
    id: "a2",
    studentId: "1",
    subjectId: "s2",
    date: new Date("2021-09-15"),
    status: "absent",
    notes: "Sin justificación",
    markedBy: "t2",
  },
]
