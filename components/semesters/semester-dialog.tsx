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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Semester } from "@/lib/types"

interface SemesterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (semester: Semester | Omit<Semester, "id">) => void
  semester?: Semester
}

export function SemesterDialog({ open, onOpenChange, onSubmit, semester }: SemesterDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Semester>({
    defaultValues: semester || {
      name: "",
      year: new Date().getFullYear(),
      period: "1",
      startDate: "",
      endDate: "",
      status: "active",
    },
  })

  const status = watch("status")
  const period = watch("period")

  useEffect(() => {
    if (semester) {
      reset(semester)
    } else {
      reset({
        name: "",
        year: new Date().getFullYear(),
        period: "1",
        startDate: "",
        endDate: "",
        status: "active",
      })
    }
  }, [semester, reset, open])

  const onFormSubmit = (data: Semester) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{semester ? "Editar Semestre" : "Agregar Semestre"}</DialogTitle>
          <DialogDescription>
            {semester
              ? "Modifica la información del semestre"
              : "Completa el formulario para agregar un nuevo semestre"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Semestre</Label>
            <Input id="name" {...register("name", { required: true })} placeholder="Semestre 2/2024" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { required: true, valueAsNumber: true })}
                placeholder="2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Periodo</Label>
              <Select value={period} onValueChange={(value) => setValue("period", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Primer Semestre</SelectItem>
                  <SelectItem value="2">Segundo Semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <Input id="startDate" type="date" {...register("startDate", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de Fin</Label>
              <Input id="endDate" type="date" {...register("endDate", { required: true })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={status} onValueChange={(value) => setValue("status", value as "active" | "inactive")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{semester ? "Guardar Cambios" : "Agregar Semestre"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
