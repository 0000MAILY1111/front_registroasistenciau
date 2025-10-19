// Core types for the attendance system

export type UserRole = "admin" | "teacher" | "student"

export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  registrationNumber: string
  career: string
  semester: string
  status: "active" | "inactive"
}

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  department: string
  specialization: string
  status: "active" | "inactive"
}

export interface Subject {
  id: string
  code: string
  name: string
  department: string
  credits: number
  hoursPerWeek: number
  description: string
}

export interface Semester {
  id: string
  name: string
  year: number
  period: string
  startDate: string
  endDate: string
  status: "active" | "inactive"
}

export interface AttendanceRecord {
  id: string
  studentId: string
  subjectId: string
  semesterId: string
  date: string
  status: "present" | "absent" | "late" | "excused"
  notes: string
}

export interface Grade {
  id: string
  studentId: string
  subjectId: string
  semesterId: string
  evaluationType: string
  score: number
  maxScore: number
  date: string
  notes?: string
}

export interface EnrollmentForm {
  registrationNumber: string
  studentName: string
  career: string
  semester: string
  location: string
  subjects: Array<{
    code: string
    name: string
    classroom: string
  }>
  schedule: Array<{
    day: string
    time: string
    subject: string
    classroom: string
  }>
}
