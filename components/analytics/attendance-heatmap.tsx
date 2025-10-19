"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { AttendanceRecord } from "@/lib/types"

interface AttendanceHeatmapProps {
  records: AttendanceRecord[]
}

export function AttendanceHeatmap({ records }: AttendanceHeatmapProps) {
  const heatmapData = useMemo(() => {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    const hours = Array.from({ length: 12 }, (_, i) => i + 7) // 7 AM to 6 PM

    const data: Record<string, Record<number, number>> = {}
    days.forEach((day) => {
      data[day] = {}
      hours.forEach((hour) => {
        data[day][hour] = 0
      })
    })

    records.forEach((record) => {
      const date = new Date(record.date)
      const dayIndex = date.getDay()
      const hour = date.getHours()
      const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]

      if (data[dayName] && hour >= 7 && hour <= 18) {
        if (record.status === "present" || record.status === "late") {
          data[dayName][hour]++
        }
      }
    })

    return { days, hours, data }
  }, [records])

  const getColor = (value: number) => {
    if (value === 0) return "bg-muted"
    if (value <= 5) return "bg-green-200 dark:bg-green-900/30"
    if (value <= 10) return "bg-green-400 dark:bg-green-700/50"
    if (value <= 15) return "bg-green-600 dark:bg-green-600/70"
    return "bg-green-800 dark:bg-green-500"
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Mapa de Calor de Asistencia</h3>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 pr-2">
              <div className="h-6" />
              {heatmapData.hours.map((hour) => (
                <div key={hour} className="flex h-6 items-center text-xs text-muted-foreground">
                  {hour}:00
                </div>
              ))}
            </div>
            {heatmapData.days.map((day) => (
              <div key={day} className="flex flex-col gap-1">
                <div className="h-6 text-center text-xs font-medium">{day}</div>
                {heatmapData.hours.map((hour) => (
                  <div
                    key={`${day}-${hour}`}
                    className={`h-6 w-12 rounded ${getColor(heatmapData.data[day][hour])}`}
                    title={`${day} ${hour}:00 - ${heatmapData.data[day][hour]} asistencias`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Menos</span>
        <div className="flex gap-1">
          <div className="h-4 w-4 rounded bg-muted" />
          <div className="h-4 w-4 rounded bg-green-200 dark:bg-green-900/30" />
          <div className="h-4 w-4 rounded bg-green-400 dark:bg-green-700/50" />
          <div className="h-4 w-4 rounded bg-green-600 dark:bg-green-600/70" />
          <div className="h-4 w-4 rounded bg-green-800 dark:bg-green-500" />
        </div>
        <span>Más</span>
      </div>
    </Card>
  )
}
