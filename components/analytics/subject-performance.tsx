"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { AttendanceRecord, Subject } from "@/lib/types"

interface SubjectPerformanceProps {
  records: AttendanceRecord[]
  subjects: Subject[]
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function SubjectPerformance({ records, subjects }: SubjectPerformanceProps) {
  const chartData = useMemo(() => {
    const dataBySubject: Record<string, { name: string; value: number }> = {}

    records.forEach((record) => {
      const subject = subjects.find((s) => s.id === record.subjectId)
      const subjectName = subject ? subject.code : record.subjectId

      if (!dataBySubject[subjectName]) {
        dataBySubject[subjectName] = { name: subjectName, value: 0 }
      }

      if (record.status === "present" || record.status === "late") {
        dataBySubject[subjectName].value++
      }
    })

    return Object.values(dataBySubject)
  }, [records, subjects])

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Asistencia por Materia</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
