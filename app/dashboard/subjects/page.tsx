"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { SubjectTable } from "@/components/subjects/subject-table"
import { SubjectDialog } from "@/components/subjects/subject-dialog"
import type { Subject } from "@/lib/types"
import { getSubjects, saveSubjects } from "@/lib/storage"

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>()

  useEffect(() => {
    const loadedSubjects = getSubjects()
    setSubjects(loadedSubjects)
    setFilteredSubjects(loadedSubjects)
  }, [])

  useEffect(() => {
    const filtered = subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.department.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredSubjects(filtered)
  }, [searchQuery, subjects])

  const handleAddSubject = (subject: Omit<Subject, "id">) => {
    const newSubject: Subject = {
      ...subject,
      id: Date.now().toString(),
    }
    const updatedSubjects = [...subjects, newSubject]
    setSubjects(updatedSubjects)
    saveSubjects(updatedSubjects)
    setDialogOpen(false)
  }

  const handleEditSubject = (subject: Subject) => {
    const updatedSubjects = subjects.map((s) => (s.id === subject.id ? subject : s))
    setSubjects(updatedSubjects)
    saveSubjects(updatedSubjects)
    setDialogOpen(false)
    setEditingSubject(undefined)
  }

  const handleDeleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter((s) => s.id !== id)
    setSubjects(updatedSubjects)
    saveSubjects(updatedSubjects)
  }

  const openEditDialog = (subject: Subject) => {
    setEditingSubject(subject)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingSubject(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Materias</h1>
          <p className="text-muted-foreground">Gestiona las materias del plan de estudios</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Materia
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, código o departamento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <SubjectTable subjects={filteredSubjects} onEdit={openEditDialog} onDelete={handleDeleteSubject} />

      <SubjectDialog
        open={dialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingSubject ? handleEditSubject : handleAddSubject}
        subject={editingSubject}
      />
    </div>
  )
}
