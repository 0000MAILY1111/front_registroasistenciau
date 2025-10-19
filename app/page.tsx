import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, BarChart3, Calendar, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Sistema de Asistencia</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl font-bold text-balance text-foreground">Control de Asistencia Inteligente</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Sistema integral de gestión académica con control de asistencia, registro de notas, análisis predictivo y
            reportes automatizados para instituciones educativas.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Ir al Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Conocer Más</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Control de Asistencia</CardTitle>
              <CardDescription>
                Registro diario de asistencia con marcado de ausencias justificadas e injustificadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Toma de asistencia por sesión</li>
                <li>• Historial completo</li>
                <li>• Notificaciones automáticas</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Users className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administración completa de estudiantes, docentes y administradores</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Roles y permisos</li>
                <li>• Perfiles personalizados</li>
                <li>• Acceso diferenciado</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-chart-3 mb-2" />
              <CardTitle>Gestión Académica</CardTitle>
              <CardDescription>Registro de materias, semestres y calificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Inscripción de materias</li>
                <li>• Registro de notas</li>
                <li>• Horarios personalizados</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-chart-4 mb-2" />
              <CardTitle>Analytics & BI</CardTitle>
              <CardDescription>Dashboards interactivos con análisis predictivo</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Métricas en tiempo real</li>
                <li>• Análisis de rendimiento</li>
                <li>• Detección de riesgos</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <FileText className="h-10 w-10 text-chart-5 mb-2" />
              <CardTitle>Reportes PDF</CardTitle>
              <CardDescription>Generación automática de reportes detallados</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Reportes de asistencia</li>
                <li>• Boletines de calificaciones</li>
                <li>• Exportación de datos</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>OCR de Boletas</CardTitle>
              <CardDescription>Procesamiento automático de boletas de inscripción</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Extracción de texto</li>
                <li>• Parsing automático</li>
                <li>• Validación de datos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Arquitectura de Microservicios</CardTitle>
            <CardDescription className="text-lg">
              Sistema escalable y optimizado para instituciones educativas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">Spring Boot</div>
                <p className="text-sm text-muted-foreground">Backend con GraphQL</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">Python</div>
                <p className="text-sm text-muted-foreground">Analytics & PDF Reports</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-chart-3">Next.js</div>
                <p className="text-sm text-muted-foreground">Frontend Moderno</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Sistema de Control de Asistencia - Arquitectura de Microservicios</p>
        </div>
      </footer>
    </div>
  )
}
