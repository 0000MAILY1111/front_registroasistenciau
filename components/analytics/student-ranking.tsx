"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import type { AttendanceRecord, Student } from "@/lib/types"

interface StudentRankingProps {
  records: AttendanceRecord[]
  students: Student[]
}

export function StudentRanking({ records, students }: StudentRankingProps) {
  const rankings = useMemo(() => {
    const studentStats: Record<string, { student: Student; total: number; present: number; rate: number }> = {}

    records.forEach((record) => {
      const student = students.find((s) => s.id === record.studentId)
      if (!student) return

      if (!studentStats[student.id]) {
        studentStats[student.id] = { student, total: 0, present: 0, rate: 0 }
      }

      studentStats[student.id].total++
      if (record.status === "present" || record.status === "late") {
        studentStats[student.id].present++
      }
    })

    return Object.values(studentStats)
      .map((stat) => ({
        ...stat,
        rate: stat.total > 0 ? (stat.present / stat.total) * 100 : 0,
      }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 10)
  }, [records, students])

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />
    return <span className="text-muted-foreground">{index + 1}</span>
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Top 10 Estudiantes por Asistencia</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Estudiante</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead className="text-right">Tasa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No hay datos disponibles
              </TableCell>
            </TableRow>
          ) : (
            rankings.map((rank, index) => (
              <TableRow key={rank.student.id}>
                <TableCell>{getRankIcon(index)}</TableCell>
                <TableCell className="font-medium">
                  {rank.student.firstName} {rank.student.lastName}
                </TableCell>
                <TableCell>{rank.student.registrationNumber}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={rank.rate >= 90 ? "default" : rank.rate >= 75 ? "secondary" : "destructive"}>
                    {rank.rate.toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
