"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const services = [
  { id: "corte", name: "Corte y Peinado", price: 45000, duration: 60 },
  { id: "color", name: "Coloración", price: 85000, duration: 120 },
  { id: "tratamiento", name: "Tratamiento Capilar", price: 35000, duration: 45 },
  { id: "peinado", name: "Peinado Especial", price: 55000, duration: 90 },
]

const availableHours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })

  const handleSubmit = () => {
    // Aquí integrarías con Google Calendar API
    alert("¡Reserva confirmada! Te enviaremos un email de confirmación.")
    onClose()
    setStep(1)
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-pink-600">Reservar Cita</DialogTitle>
          <DialogDescription>
            Completa los siguientes pasos para reservar tu cita en BLACK TOKYO STUDIO
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= i ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && <div className={`w-12 h-1 ${step > i ? "bg-pink-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selecciona tu servicio</h3>
              <div className="grid gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-colors ${
                      selectedService === service.id ? "border-pink-500 bg-pink-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{service.name}</CardTitle>
                        <Badge variant="secondary">${service.price.toLocaleString()}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration} minutos
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedService}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                Continuar
              </Button>
            </div>
          )}

          {/* Step 2: Date and Time */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selecciona fecha y hora</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Fecha</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Hora disponible</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableHours.map((hour) => (
                      <Button
                        key={hour}
                        variant={selectedTime === hour ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(hour)}
                        className={selectedTime === hour ? "bg-pink-500 hover:bg-pink-600" : ""}
                      >
                        {hour}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-pink-500 hover:bg-pink-600"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de contacto</h3>

              {/* Booking Summary */}
              <Card className="bg-pink-50 border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Resumen de tu reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Servicio:</span>
                    <span className="font-medium">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fecha:</span>
                    <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hora:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duración:</span>
                    <span className="font-medium">{selectedServiceData?.duration} min</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total:</span>
                    <span>${selectedServiceData?.price.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notas adicionales</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Alguna solicitud especial o información adicional..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Atrás
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.email}
                  className="flex-1 bg-pink-500 hover:bg-pink-600"
                >
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
