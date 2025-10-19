"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Save, UserCheck, UserX, Clock } from "lucide-react"
import type { Student, AttendanceRecord } from "@/lib/types"
import { getStudents } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface AttendanceSheetProps {
  subjectId: string
  semesterId: string
  date: Date
  onSave: (records: AttendanceRecord[]) => void
}

type AttendanceStatus = "present" | "absent" | "late" | "excused"

export function AttendanceSheet({ subjectId, semesterId, date, onSave }: AttendanceSheetProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({})
  const { toast } = useToast()

  useEffect(() => {
    const allStudents = getStudents().filter((s) => s.status === "active")
    setStudents(allStudents)

    // Initialize all students as absent by default
    const initialAttendance: Record<string, AttendanceStatus> = {}
    allStudents.forEach((student) => {
      initialAttendance[student.id] = "absent"
    })
    setAttendance(initialAttendance)
  }, [subjectId, semesterId])

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSave = () => {
    const records: AttendanceRecord[] = students.map((student) => ({
      id: `${student.id}-${subjectId}-${date.toISOString()}`,
      studentId: student.id,
      subjectId,
      semesterId,
      date: date.toISOString(),
      status: attendance[student.id] || "absent",
      notes: "",
    }))

    onSave(records)
    toast({
      title: "Asistencia guardada",
      description: `Se ha registrado la asistencia de ${students.length} estudiantes.`,
    })
  }

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "default"
      case "absent":
        return "destructive"
      case "late":
        return "secondary"
      case "excused":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "Presente"
      case "absent":
        return "Ausente"
      case "late":
        return "Tardanza"
      case "excused":
        return "Justificado"
      default:
        return "Ausente"
    }
  }

  const stats = {
    present: Object.values(attendance).filter((s) => s === "present").length,
    absent: Object.values(attendance).filter((s) => s === "absent").length,
    late: Object.values(attendance).filter((s) => s === "late").length,
    excused: Object.values(attendance).filter((s) => s === "excused").length,
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Presentes</p>
              <p className="text-2xl font-bold">{stats.present}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
              <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ausentes</p>
              <p className="text-2xl font-bold">{stats.absent}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tardanzas</p>
              <p className="text-2xl font-bold">{stats.late}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <UserCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Justificados</p>
              <p className="text-2xl font-bold">{stats.excused}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registro</TableHead>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Carrera</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.registrationNumber}</TableCell>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.career}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(attendance[student.id])}>
                    {getStatusLabel(attendance[student.id])}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant={attendance[student.id] === "present" ? "default" : "outline"}
                      onClick={() => handleStatusChange(student.id, "present")}
                    >
                      Presente
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[student.id] === "late" ? "default" : "outline"}
                      onClick={() => handleStatusChange(student.id, "late")}
                    >
                      Tarde
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[student.id] === "excused" ? "default" : "outline"}
                      onClick={() => handleStatusChange(student.id, "excused")}
                    >
                      Justificado
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[student.id] === "absent" ? "destructive" : "outline"}
                      onClick={() => handleStatusChange(student.id, "absent")}
                    >
                      Ausente
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Guardar Asistencia
        </Button>
      </div>
    </div>
  )
}
