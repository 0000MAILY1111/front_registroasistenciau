"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { AttendanceRecord } from "@/lib/types"

interface AttendanceChartProps {
  records: AttendanceRecord[]
}

export function AttendanceChart({ records }: AttendanceChartProps) {
  const chartData = useMemo(() => {
    const dataByDate: Record<string, { date: string; present: number; absent: number; late: number; excused: number }> =
      {}

    records.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString()
      if (!dataByDate[date]) {
        dataByDate[date] = { date, present: 0, absent: 0, late: 0, excused: 0 }
      }
      dataByDate[date][record.status]++
    })

    return Object.values(dataByDate).slice(-7) // Last 7 days
  }, [records])

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Tendencia de Asistencia (Últimos 7 días)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" fill="hsl(var(--chart-1))" name="Presente" />
          <Bar dataKey="late" fill="hsl(var(--chart-2))" name="Tarde" />
          <Bar dataKey="excused" fill="hsl(var(--chart-3))" name="Justificado" />
          <Bar dataKey="absent" fill="hsl(var(--chart-4))" name="Ausente" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
