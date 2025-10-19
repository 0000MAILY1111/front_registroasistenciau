"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { AttendanceSheet } from "@/components/attendance/attendance-sheet"
import { AttendanceHistory } from "@/components/attendance/attendance-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Subject, Semester, AttendanceRecord } from "@/lib/types"
import { getSubjects, getSemesters, getAttendanceRecords, saveAttendanceRecords } from "@/lib/storage"
import { CalendarIcon } from "lucide-react"

export default function AttendancePage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    setSubjects(getSubjects())
    setSemesters(getSemesters())
    setAttendanceRecords(getAttendanceRecords())
  }, [])

  const handleSaveAttendance = (records: AttendanceRecord[]) => {
    const allRecords = getAttendanceRecords()
    const updatedRecords = [...allRecords, ...records]
    saveAttendanceRecords(updatedRecords)
    setAttendanceRecords(updatedRecords)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Control de Asistencia</h1>
        <p className="text-muted-foreground">Registra y gestiona la asistencia de los estudiantes</p>
      </div>

      <Tabs defaultValue="take-attendance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="take-attendance">Tomar Asistencia</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="take-attendance" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Semestre</label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un semestre" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.id} value={semester.id}>
                          {semester.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Materia</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una materia" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.code} - {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                      onClick={() => {
                        const calendarEl = document.getElementById("attendance-calendar")
                        calendarEl?.classList.toggle("hidden")
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate.toLocaleDateString()}
                    </Button>
                    <div id="attendance-calendar" className="absolute z-10 mt-2 hidden">
                      <Card className="p-3">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                        />
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {selectedSubject && selectedSemester && (
            <AttendanceSheet
              subjectId={selectedSubject}
              semesterId={selectedSemester}
              date={selectedDate}
              onSave={handleSaveAttendance}
            />
          )}
        </TabsContent>

        <TabsContent value="history">
          <AttendanceHistory records={attendanceRecords} subjects={subjects} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
