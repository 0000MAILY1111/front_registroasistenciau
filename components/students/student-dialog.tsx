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
import type { Student } from "@/lib/types"

interface StudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (student: Student | Omit<Student, "id">) => void
  student?: Student
}

export function StudentDialog({ open, onOpenChange, onSubmit, student }: StudentDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Student>({
    defaultValues: student || {
      firstName: "",
      lastName: "",
      email: "",
      registrationNumber: "",
      career: "",
      semester: "",
      status: "active",
    },
  })

  const status = watch("status")

  useEffect(() => {
    if (student) {
      reset(student)
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        registrationNumber: "",
        career: "",
        semester: "",
        status: "active",
      })
    }
  }, [student, reset, open])

  const onFormSubmit = (data: Student) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{student ? "Editar Estudiante" : "Agregar Estudiante"}</DialogTitle>
          <DialogDescription>
            {student
              ? "Modifica la información del estudiante"
              : "Completa el formulario para agregar un nuevo estudiante"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" {...register("firstName", { required: true })} placeholder="Juan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" {...register("lastName", { required: true })} placeholder="Pérez" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="juan.perez@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Número de Registro</Label>
            <Input
              id="registrationNumber"
              {...register("registrationNumber", { required: true })}
              placeholder="219125041"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="career">Carrera</Label>
            <Input id="career" {...register("career", { required: true })} placeholder="Ingeniería en Sistemas" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semestre</Label>
            <Input id="semester" {...register("semester", { required: true })} placeholder="5to Semestre" />
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
            <Button type="submit">{student ? "Guardar Cambios" : "Agregar Estudiante"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
