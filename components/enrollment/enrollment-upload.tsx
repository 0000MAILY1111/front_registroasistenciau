"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2, ImageIcon } from "lucide-react"
import type { EnrollmentForm } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface EnrollmentUploadProps {
  onDataExtracted: (data: EnrollmentForm) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function EnrollmentUpload({ onDataExtracted, isProcessing, setIsProcessing }: EnrollmentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const processImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    toast({
      title: "Procesando imagen",
      description: "Extrayendo información de la boleta...",
    })

    // Simulate OCR processing - In production, this would call your Python backend
    // or use Tesseract.js for client-side OCR
    setTimeout(() => {
      // Mock extracted data based on the example image provided
      const mockData: EnrollmentForm = {
        registrationNumber: "219125041",
        studentName: "VALDEZ PAYLLO MAILY CELINA",
        career: "187-4 INGENIERIA EN SISTEMAS",
        semester: "2/2021",
        location: "SANTA CRUZ",
        subjects: [
          { code: "MAT202", name: "Matemáticas II", classroom: "SB" },
          { code: "ECO300", name: "Economía", classroom: "SA" },
          { code: "INF310", name: "Informática 310", classroom: "SX" },
          { code: "INF312", name: "Informática 312", classroom: "SA" },
          { code: "MAT302", name: "Matemáticas 302", classroom: "SA" },
          { code: "ADM320", name: "Administración", classroom: "SC" },
          { code: "INF322", name: "Informática 322", classroom: "SD" },
        ],
        schedule: [
          { day: "Lunes", time: "08:30-09:15", subject: "INF312", classroom: "SA" },
          { day: "Lunes", time: "09:15-10:00", subject: "INF312", classroom: "SA" },
          { day: "Lunes", time: "10:00-10:45", subject: "MAT302", classroom: "SA" },
          { day: "Lunes", time: "10:45-11:30", subject: "MAT302", classroom: "SA" },
          { day: "Lunes", time: "11:30-12:15", subject: "INF310", classroom: "SX" },
          { day: "Lunes", time: "12:15-13:00", subject: "INF310", classroom: "SX" },
          { day: "Lunes", time: "16:45-17:30", subject: "ECO300", classroom: "SA" },
          { day: "Lunes", time: "17:30-18:15", subject: "ECO300", classroom: "SA" },
        ],
      }

      onDataExtracted(mockData)
      toast({
        title: "Procesamiento completado",
        description: "La información ha sido extraída exitosamente.",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div
          className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 transition-colors hover:border-muted-foreground/50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <div className="relative max-w-2xl">
                <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="rounded-lg border" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Cambiar Imagen
                </Button>
                <Button onClick={processImage} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Procesar Boleta
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">Arrastra una imagen aquí</p>
                <p className="text-sm text-muted-foreground">o haz clic para seleccionar un archivo</p>
              </div>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Seleccionar Imagen
              </Button>
            </>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Información sobre el procesamiento OCR</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• El sistema extraerá automáticamente: número de registro, nombre, carrera, semestre y materias</p>
          <p>• Asegúrate de que la imagen sea clara y legible</p>
          <p>• Formatos soportados: JPG, PNG, PDF</p>
          <p>• Podrás revisar y editar la información antes de guardarla</p>
        </div>
      </Card>
    </div>
  )
}
