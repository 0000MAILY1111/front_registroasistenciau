"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { StudentTable } from "@/components/students/student-table"
import { StudentDialog } from "@/components/students/student-dialog"
import type { Student } from "@/lib/types"
import { getStudents, saveStudents } from "@/lib/storage"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | undefined>()

  useEffect(() => {
    const loadedStudents = getStudents()
    setStudents(loadedStudents)
    setFilteredStudents(loadedStudents)
  }, [])

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredStudents(filtered)
  }, [searchQuery, students])

  const handleAddStudent = (student: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
    }
    const updatedStudents = [...students, newStudent]
    setStudents(updatedStudents)
    saveStudents(updatedStudents)
    setDialogOpen(false)
  }

  const handleEditStudent = (student: Student) => {
    const updatedStudents = students.map((s) => (s.id === student.id ? student : s))
    setStudents(updatedStudents)
    saveStudents(updatedStudents)
    setDialogOpen(false)
    setEditingStudent(undefined)
  }

  const handleDeleteStudent = (id: string) => {
    const updatedStudents = students.filter((s) => s.id !== id)
    setStudents(updatedStudents)
    saveStudents(updatedStudents)
  }

  const openEditDialog = (student: Student) => {
    setEditingStudent(student)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingStudent(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estudiantes</h1>
          <p className="text-muted-foreground">Gestiona los estudiantes registrados en el sistema</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Estudiante
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, registro o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <StudentTable students={filteredStudents} onEdit={openEditDialog} onDelete={handleDeleteStudent} />

      <StudentDialog
        open={dialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        student={editingStudent}
      />
    </div>
  )
}
