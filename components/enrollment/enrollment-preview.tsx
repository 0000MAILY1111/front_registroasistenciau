"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, X, Edit2, Check } from "lucide-react"
import type { EnrollmentForm } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface EnrollmentPreviewProps {
  data: EnrollmentForm
  onSave: () => void
  onReset: () => void
}

export function EnrollmentPreview({ data, onSave, onReset }: EnrollmentPreviewProps) {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(data)
  const { toast } = useToast()

  const handleSave = () => {
    onSave()
    toast({
      title: "Datos guardados",
      description: "La información de inscripción ha sido guardada exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Información Extraída</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Finalizar Edición
                </>
              ) : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Editar
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Número de Registro</Label>
            {editMode ? (
              <Input
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              />
            ) : (
              <p className="rounded-md border bg-muted px-3 py-2">{formData.registrationNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Nombre Completo</Label>
            {editMode ? (
              <Input
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              />
            ) : (
              <p className="rounded-md border bg-muted px-3 py-2">{formData.studentName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Carrera</Label>
            {editMode ? (
              <Input value={formData.career} onChange={(e) => setFormData({ ...formData, career: e.target.value })} />
            ) : (
              <p className="rounded-md border bg-muted px-3 py-2">{formData.career}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Semestre</Label>
            {editMode ? (
              <Input
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              />
            ) : (
              <p className="rounded-md border bg-muted px-3 py-2">{formData.semester}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Ubicación</Label>
            {editMode ? (
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            ) : (
              <p className="rounded-md border bg-muted px-3 py-2">{formData.location}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Materias Inscritas ({formData.subjects.length})</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Aula</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.subjects.map((subject, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{subject.code}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.classroom}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Horario</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Día</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Materia</TableHead>
              <TableHead>Aula</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.schedule.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.classroom}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onReset}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Inscripción
        </Button>
      </div>
    </div>
  )
}
