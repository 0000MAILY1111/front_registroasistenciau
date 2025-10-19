"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Send, Mail, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [telegramEnabled, setTelegramEnabled] = useState(false)
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [telegramBotToken, setTelegramBotToken] = useState("")
  const [telegramChatId, setTelegramChatId] = useState("")
  const [smtpHost, setSmtpHost] = useState("")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUser, setSmtpUser] = useState("")
  const [smtpPassword, setSmtpPassword] = useState("")
  const { toast } = useToast()

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem(
      "integrationSettings",
      JSON.stringify({
        telegram: { enabled: telegramEnabled, botToken: telegramBotToken, chatId: telegramChatId },
        email: { enabled: emailEnabled, smtpHost, smtpPort, smtpUser, smtpPassword },
      }),
    )

    toast({
      title: "Configuración guardada",
      description: "Las integraciones han sido configuradas exitosamente.",
    })
  }

  const handleTestTelegram = async () => {
    toast({
      title: "Enviando mensaje de prueba",
      description: "Verificando conexión con Telegram...",
    })

    // Call API to test Telegram
    try {
      const response = await fetch("/api/integrations/telegram/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken: telegramBotToken, chatId: telegramChatId }),
      })

      if (response.ok) {
        toast({
          title: "Prueba exitosa",
          description: "El mensaje de prueba fue enviado a Telegram.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo enviar el mensaje de prueba.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al conectar con Telegram.",
        variant: "destructive",
      })
    }
  }

  const handleTestEmail = async () => {
    toast({
      title: "Enviando email de prueba",
      description: "Verificando configuración SMTP...",
    })

    // Call API to test email
    try {
      const response = await fetch("/api/integrations/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ smtpHost, smtpPort, smtpUser, smtpPassword }),
      })

      if (response.ok) {
        toast({
          title: "Prueba exitosa",
          description: "El email de prueba fue enviado correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo enviar el email de prueba.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al conectar con el servidor SMTP.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Configura las integraciones y notificaciones del sistema</p>
      </div>

      <Tabs defaultValue="telegram" className="space-y-6">
        <TabsList>
          <TabsTrigger value="telegram">
            <MessageSquare className="mr-2 h-4 w-4" />
            Telegram
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="telegram">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Habilitar Notificaciones por Telegram</Label>
                  <p className="text-sm text-muted-foreground">
                    Envía notificaciones automáticas de ausencias a través de Telegram
                  </p>
                </div>
                <Switch checked={telegramEnabled} onCheckedChange={setTelegramEnabled} />
              </div>

              {telegramEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="botToken">Bot Token</Label>
                    <Input
                      id="botToken"
                      type="password"
                      placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                      value={telegramBotToken}
                      onChange={(e) => setTelegramBotToken(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Obtén tu bot token desde @BotFather en Telegram</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chatId">Chat ID</Label>
                    <Input
                      id="chatId"
                      placeholder="-1001234567890"
                      value={telegramChatId}
                      onChange={(e) => setTelegramChatId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      ID del grupo o canal donde se enviarán las notificaciones
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleTestTelegram} variant="outline">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensaje de Prueba
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Habilitar Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Envía reportes y notificaciones por correo electrónico
                  </p>
                </div>
                <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
              </div>

              {emailEnabled && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">Servidor SMTP</Label>
                      <Input
                        id="smtpHost"
                        placeholder="smtp.gmail.com"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">Puerto</Label>
                      <Input
                        id="smtpPort"
                        placeholder="587"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">Usuario / Email</Label>
                    <Input
                      id="smtpUser"
                      type="email"
                      placeholder="tu-email@gmail.com"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Contraseña</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      placeholder="••••••••"
                      value={smtpPassword}
                      onChange={(e) => setSmtpPassword(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Para Gmail, usa una contraseña de aplicación en lugar de tu contraseña normal
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleTestEmail} variant="outline">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Email de Prueba
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
