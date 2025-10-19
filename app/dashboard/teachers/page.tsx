"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { TeacherTable } from "@/components/teachers/teacher-table"
import { TeacherDialog } from "@/components/teachers/teacher-dialog"
import type { Teacher } from "@/lib/types"
import { getTeachers, saveTeachers } from "@/lib/storage"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>()

  useEffect(() => {
    const loadedTeachers = getTeachers()
    setTeachers(loadedTeachers)
    setFilteredTeachers(loadedTeachers)
  }, [])

  useEffect(() => {
    const filtered = teachers.filter(
      (teacher) =>
        teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredTeachers(filtered)
  }, [searchQuery, teachers])

  const handleAddTeacher = (teacher: Omit<Teacher, "id">) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now().toString(),
    }
    const updatedTeachers = [...teachers, newTeacher]
    setTeachers(updatedTeachers)
    saveTeachers(updatedTeachers)
    setDialogOpen(false)
  }

  const handleEditTeacher = (teacher: Teacher) => {
    const updatedTeachers = teachers.map((t) => (t.id === teacher.id ? teacher : t))
    setTeachers(updatedTeachers)
    saveTeachers(updatedTeachers)
    setDialogOpen(false)
    setEditingTeacher(undefined)
  }

  const handleDeleteTeacher = (id: string) => {
    const updatedTeachers = teachers.filter((t) => t.id !== id)
    setTeachers(updatedTeachers)
    saveTeachers(updatedTeachers)
  }

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingTeacher(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Docentes</h1>
          <p className="text-muted-foreground">Gestiona los docentes registrados en el sistema</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Docente
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, ID de empleado o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <TeacherTable teachers={filteredTeachers} onEdit={openEditDialog} onDelete={handleDeleteTeacher} />

      <TeacherDialog
        open={dialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
        teacher={editingTeacher}
      />
    </div>
  )
}
