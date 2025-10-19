"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Subject } from "@/lib/types"

interface SubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (subject: Subject | Omit<Subject, "id">) => void
  subject?: Subject
}

export function SubjectDialog({ open, onOpenChange, onSubmit, subject }: SubjectDialogProps) {
  const { register, handleSubmit, reset } = useForm<Subject>({
    defaultValues: subject || {
      code: "",
      name: "",
      department: "",
      credits: 0,
      hoursPerWeek: 0,
      description: "",
    },
  })

  useEffect(() => {
    if (subject) {
      reset(subject)
    } else {
      reset({
        code: "",
        name: "",
        department: "",
        credits: 0,
        hoursPerWeek: 0,
        description: "",
      })
    }
  }, [subject, reset, open])

  const onFormSubmit = (data: Subject) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{subject ? "Editar Materia" : "Agregar Materia"}</DialogTitle>
          <DialogDescription>
            {subject
              ? "Modifica la información de la materia"
              : "Completa el formulario para agregar una nueva materia"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código</Label>
              <Input id="code" {...register("code", { required: true })} placeholder="MAT202" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input id="department" {...register("department", { required: true })} placeholder="Matemáticas" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Materia</Label>
            <Input id="name" {...register("name", { required: true })} placeholder="Cálculo Diferencial" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credits">Créditos</Label>
              <Input
                id="credits"
                type="number"
                {...register("credits", { required: true, valueAsNumber: true })}
                placeholder="4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Horas por Semana</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                {...register("hoursPerWeek", { required: true, valueAsNumber: true })}
                placeholder="6"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descripción de la materia..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{subject ? "Guardar Cambios" : "Agregar Materia"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
