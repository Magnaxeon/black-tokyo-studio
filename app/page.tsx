"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Star, Instagram, MessageCircle, MapPin, Scissors, Sparkles, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BookingModal } from "@/components/booking-modal"
import { AdminPanel } from "@/components/admin-panel"
import { CherryBlossoms } from "@/components/cherry-blossoms"

const services = [
  { name: "Corte y Peinado", price: "$45.000", duration: "60 min", icon: Scissors },
  { name: "Coloración", price: "$85.000", duration: "120 min", icon: Sparkles },
  { name: "Tratamiento Capilar", price: "$35.000", duration: "45 min", icon: Heart },
  { name: "Peinado Especial", price: "$55.000", duration: "90 min", icon: Star },
]

const instagramPosts = [
  { id: 1, image: "/placeholder.svg?height=300&width=300", likes: 245 },
  { id: 2, image: "/placeholder.svg?height=300&width=300", likes: 189 },
  { id: 3, image: "/placeholder.svg?height=300&width=300", likes: 312 },
  { id: 4, image: "/placeholder.svg?height=300&width=300", likes: 156 },
]

const reviews = [
  {
    name: "María González",
    rating: 5,
    text: "¡Increíble experiencia! El ambiente es súper relajante y el resultado fue perfecto.",
  },
  {
    name: "Ana Rodríguez",
    rating: 5,
    text: "La mejor colorista de la ciudad. Siempre logra exactamente lo que quiero.",
  },
  { name: "Sofía López", rating: 5, text: "El salón tiene una decoración hermosa y el servicio es excepcional." },
]

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
      <CherryBlossoms />

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">BLACK TOKYO STUDIO</h1>
              <p className="text-sm text-pink-600"></p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Button
                onClick={() => setIsLoggedIn(true)}
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                Iniciar Sesión Gmail
              </Button>
            ) : (
              <Button onClick={() => setIsAdminOpen(true)} className="bg-pink-500 hover:bg-pink-600 text-white">
                Panel Admin
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenida/o a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
              {" "}
              BLACK TOKYO STUDIO
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Donde la elegancia japonesa se encuentra con el arte capilar. Experimenta la belleza en cada detalle.
          </p>
          <Button
            onClick={() => setIsBookingOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Reservar Cita
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-pink-100 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.duration}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-pink-600">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Posts */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Síguenos en Instagram</h3>
            <Link
              href="https://www.instagram.com/blacktokyo.hairstudio/?hl=es-la"
              target="_blank"
              className="inline-flex items-center text-pink-600 hover:text-pink-700"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @blacktokyo.hairstudio
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-pink-100 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Instagram post"
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <Heart className="w-4 h-4 mr-1 fill-current" />
                    {post.likes}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="relative z-10 py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Lo que dicen nuestras clientas</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="border-pink-100">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-semibold">{review.name[0]}</span>
                    </div>
                    <div>
                      <CardTitle className="text-sm">{review.name}</CardTitle>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="https://maps.app.goo.gl/9gUYNf74mPCfA34v9" target="_blank">
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent">
                <MapPin className="w-4 h-4 mr-2" />
                Ver más reseñas en Google
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">¿Lista para tu transformación?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsBookingOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Reservar Ahora
            </Button>
            <Link href="https://wa.me/+573001234567" target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 w-full sm:w-auto bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Escribir por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">BLACK TOKYO STUDIO</span>
          </div>
          <p className="text-gray-400 mb-4">Donde la elegancia japonesa se encuentra con el arte capilar</p>
          <div className="flex justify-center space-x-6">
            <Link
              href="https://www.instagram.com/blacktokyo.hairstudio/?hl=es-la"
              target="_blank"
              className="text-gray-400 hover:text-pink-400"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://maps.app.goo.gl/9gUYNf74mPCfA34v9"
              target="_blank"
              className="text-gray-400 hover:text-pink-400"
            >
              <MapPin className="w-5 h-5" />
            </Link>
            <Link href="https://wa.me/+573001234567" target="_blank" className="text-gray-400 hover:text-green-400">
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  )
}
