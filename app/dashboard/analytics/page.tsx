"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AttendanceChart } from "@/components/analytics/attendance-chart"
import { SubjectPerformance } from "@/components/analytics/subject-performance"
import { StudentRanking } from "@/components/analytics/student-ranking"
import { AttendanceHeatmap } from "@/components/analytics/attendance-heatmap"
import { Download, TrendingUp, Users, BookOpen, AlertTriangle } from "lucide-react"
import type { AttendanceRecord, Student, Subject, Semester } from "@/lib/types"
import { getAttendanceRecords, getStudents, getSubjects, getSemesters } from "@/lib/storage"

export default function AnalyticsPage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [selectedSemester, setSelectedSemester] = useState<string>("all")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")

  useEffect(() => {
    setAttendanceRecords(getAttendanceRecords())
    setStudents(getStudents())
    setSubjects(getSubjects())
    setSemesters(getSemesters())
  }, [])

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSemester = selectedSemester === "all" || record.semesterId === selectedSemester
      const matchesSubject = selectedSubject === "all" || record.subjectId === selectedSubject
      return matchesSemester && matchesSubject
    })
  }, [attendanceRecords, selectedSemester, selectedSubject])

  const stats = useMemo(() => {
    const total = filteredRecords.length
    const present = filteredRecords.filter((r) => r.status === "present").length
    const absent = filteredRecords.filter((r) => r.status === "absent").length
    const late = filteredRecords.filter((r) => r.status === "late").length
    const attendanceRate = total > 0 ? ((present + late) / total) * 100 : 0

    return {
      total,
      present,
      absent,
      late,
      attendanceRate: attendanceRate.toFixed(1),
    }
  }, [filteredRecords])

  const handleExportPDF = () => {
    // This would call your Python backend to generate PDF report
    console.log("Exporting PDF report...")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Analíticas</h1>
          <p className="text-muted-foreground">Visualiza y analiza los datos de asistencia</p>
        </div>
        <Button onClick={handleExportPDF}>
          <Download className="mr-2 h-4 w-4" />
          Exportar Reporte PDF
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tasa de Asistencia</p>
              <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estudiantes Activos</p>
              <p className="text-2xl font-bold">{students.filter((s) => s.status === "active").length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Materias</p>
              <p className="text-2xl font-bold">{subjects.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ausencias</p>
              <p className="text-2xl font-bold">{stats.absent}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Filtrar por Semestre</label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los semestres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los semestres</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Filtrar por Materia</label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las materias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las materias</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.code} - {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart records={filteredRecords} />
        <SubjectPerformance records={filteredRecords} subjects={subjects} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StudentRanking records={filteredRecords} students={students} />
        <AttendanceHeatmap records={filteredRecords} />
      </div>
    </div>
  )
}
