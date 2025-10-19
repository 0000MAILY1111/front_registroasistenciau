"use client"

import { useState } from "react"
import { EnrollmentUpload } from "@/components/enrollment/enrollment-upload"
import { EnrollmentPreview } from "@/components/enrollment/enrollment-preview"
import type { EnrollmentForm } from "@/lib/types"

export default function EnrollmentPage() {
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentForm | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDataExtracted = (data: EnrollmentForm) => {
    setEnrollmentData(data)
    setIsProcessing(false)
  }

  const handleSave = () => {
    if (!enrollmentData) return
    // Here you would save to your backend
    console.log("Saving enrollment data:", enrollmentData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Procesar Boleta de Inscripción</h1>
        <p className="text-muted-foreground">
          Sube una imagen de la boleta de inscripción para extraer automáticamente la información
        </p>
      </div>

      {!enrollmentData ? (
        <EnrollmentUpload
          onDataExtracted={handleDataExtracted}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      ) : (
        <EnrollmentPreview data={enrollmentData} onSave={handleSave} onReset={() => setEnrollmentData(null)} />
      )}
    </div>
  )
}
