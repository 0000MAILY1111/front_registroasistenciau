"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { SemesterTable } from "@/components/semesters/semester-table"
import { SemesterDialog } from "@/components/semesters/semester-dialog"
import type { Semester } from "@/lib/types"
import { getSemesters, saveSemesters } from "@/lib/storage"

export default function SemestersPage() {
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [filteredSemesters, setFilteredSemesters] = useState<Semester[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSemester, setEditingSemester] = useState<Semester | undefined>()

  useEffect(() => {
    const loadedSemesters = getSemesters()
    setSemesters(loadedSemesters)
    setFilteredSemesters(loadedSemesters)
  }, [])

  useEffect(() => {
    const filtered = semesters.filter(
      (semester) =>
        semester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        semester.year.toString().includes(searchQuery),
    )
    setFilteredSemesters(filtered)
  }, [searchQuery, semesters])

  const handleAddSemester = (semester: Omit<Semester, "id">) => {
    const newSemester: Semester = {
      ...semester,
      id: Date.now().toString(),
    }
    const updatedSemesters = [...semesters, newSemester]
    setSemesters(updatedSemesters)
    saveSemesters(updatedSemesters)
    setDialogOpen(false)
  }

  const handleEditSemester = (semester: Semester) => {
    const updatedSemesters = semesters.map((s) => (s.id === semester.id ? semester : s))
    setSemesters(updatedSemesters)
    saveSemesters(updatedSemesters)
    setDialogOpen(false)
    setEditingSemester(undefined)
  }

  const handleDeleteSemester = (id: string) => {
    const updatedSemesters = semesters.filter((s) => s.id !== id)
    setSemesters(updatedSemesters)
    saveSemesters(updatedSemesters)
  }

  const openEditDialog = (semester: Semester) => {
    setEditingSemester(semester)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingSemester(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semestres</h1>
          <p className="text-muted-foreground">Gestiona los periodos académicos</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Semestre
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o año..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <SemesterTable semesters={filteredSemesters} onEdit={openEditDialog} onDelete={handleDeleteSemester} />

      <SemesterDialog
        open={dialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingSemester ? handleEditSemester : handleAddSemester}
        semester={editingSemester}
      />
    </div>
  )
}
