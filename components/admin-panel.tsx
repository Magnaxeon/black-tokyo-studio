"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Settings, Users, BarChart3 } from "lucide-react"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

const weekDays = [
  { id: "monday", name: "Lunes", enabled: true },
  { id: "tuesday", name: "Martes", enabled: true },
  { id: "wednesday", name: "Miércoles", enabled: true },
  { id: "thursday", name: "Jueves", enabled: true },
  { id: "friday", name: "Viernes", enabled: true },
  { id: "saturday", name: "Sábado", enabled: true },
  { id: "sunday", name: "Domingo", enabled: false },
]

const upcomingBookings = [
  { id: 1, client: "María González", service: "Coloración", date: "2024-01-15", time: "10:00", status: "confirmed" },
  { id: 2, client: "Ana Rodríguez", service: "Corte y Peinado", date: "2024-01-15", time: "14:00", status: "pending" },
  { id: 3, client: "Sofía López", service: "Tratamiento", date: "2024-01-16", time: "09:00", status: "confirmed" },
]

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "18:00",
  })
  const [daySettings, setDaySettings] = useState(weekDays)

  const toggleDay = (dayId: string) => {
    setDaySettings((prev) => prev.map((day) => (day.id === dayId ? { ...day, enabled: !day.enabled } : day)))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-pink-600">Panel de Administración - BLACK TOKYO STUDIO</DialogTitle>
          <DialogDescription>Gestiona tu calendario, horarios y reservas</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">
              <Calendar className="w-4 h-4 mr-2" />
              Horarios
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Users className="w-4 h-4 mr-2" />
              Reservas
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Estadísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Horario de Trabajo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Hora de inicio</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={workingHours.start}
                      onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time">Hora de cierre</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={workingHours.end}
                      onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Días de Trabajo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {daySettings.map((day) => (
                    <div key={day.id} className="flex items-center justify-between">
                      <Label htmlFor={day.id} className="text-sm font-medium">
                        {day.name}
                      </Label>
                      <Switch id={day.id} checked={day.enabled} onCheckedChange={() => toggleDay(day.id)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-pink-500 hover:bg-pink-600">Sincronizar con Google Calendar</Button>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{booking.client}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {booking.date}
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status === "confirmed" ? "Confirmada" : "Pendiente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Servicios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Aquí podrás editar los servicios, precios y duraciones.</p>
                <Button variant="outline">Editar Servicios</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integración con Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Conecta tu cuenta de Instagram para mostrar automáticamente tus últimas publicaciones.
                </p>
                <Button variant="outline">Conectar Instagram</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Reservas este mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-600">24</div>
                  <p className="text-xs text-gray-600">+12% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos estimados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-600">$1.340.000</div>
                  <p className="text-xs text-gray-600">+8% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Servicio más popular</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-600">Coloración</div>
                  <p className="text-xs text-gray-600">45% de las reservas</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
