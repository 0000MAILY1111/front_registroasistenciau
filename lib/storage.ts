import type { Student, Teacher, Subject, Semester, AttendanceRecord } from "./types"

// Student storage
export function getStudents(): Student[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("students")
  return data ? JSON.parse(data) : []
}

export function saveStudents(students: Student[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("students", JSON.stringify(students))
}

// Teacher storage
export function getTeachers(): Teacher[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("teachers")
  return data ? JSON.parse(data) : []
}

export function saveTeachers(teachers: Teacher[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("teachers", JSON.stringify(teachers))
}

// Subject storage
export function getSubjects(): Subject[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("subjects")
  return data ? JSON.parse(data) : []
}

export function saveSubjects(subjects: Subject[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("subjects", JSON.stringify(subjects))
}

// Semester storage
export function getSemesters(): Semester[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("semesters")
  return data ? JSON.parse(data) : []
}

export function saveSemesters(semesters: Semester[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("semesters", JSON.stringify(semesters))
}

// Attendance storage
export function getAttendanceRecords(): AttendanceRecord[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("attendanceRecords")
  return data ? JSON.parse(data) : []
}

export function saveAttendanceRecords(records: AttendanceRecord[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("attendanceRecords", JSON.stringify(records))
}
