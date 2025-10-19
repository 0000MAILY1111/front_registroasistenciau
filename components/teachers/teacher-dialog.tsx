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
import type { Teacher } from "@/lib/types"

interface TeacherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (teacher: Teacher | Omit<Teacher, "id">) => void
  teacher?: Teacher
}

export function TeacherDialog({ open, onOpenChange, onSubmit, teacher }: TeacherDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Teacher>({
    defaultValues: teacher || {
      firstName: "",
      lastName: "",
      email: "",
      employeeId: "",
      department: "",
      specialization: "",
      status: "active",
    },
  })

  const status = watch("status")

  useEffect(() => {
    if (teacher) {
      reset(teacher)
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        employeeId: "",
        department: "",
        specialization: "",
        status: "active",
      })
    }
  }, [teacher, reset, open])

  const onFormSubmit = (data: Teacher) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{teacher ? "Editar Docente" : "Agregar Docente"}</DialogTitle>
          <DialogDescription>
            {teacher ? "Modifica la información del docente" : "Completa el formulario para agregar un nuevo docente"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" {...register("firstName", { required: true })} placeholder="María" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" {...register("lastName", { required: true })} placeholder="González" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="maria.gonzalez@universidad.edu"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId">ID de Empleado</Label>
            <Input id="employeeId" {...register("employeeId", { required: true })} placeholder="EMP-2024-001" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Departamento</Label>
            <Input
              id="department"
              {...register("department", { required: true })}
              placeholder="Ciencias de la Computación"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Especialidad</Label>
            <Input
              id="specialization"
              {...register("specialization", { required: true })}
              placeholder="Inteligencia Artificial"
            />
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
            <Button type="submit">{teacher ? "Guardar Cambios" : "Agregar Docente"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
