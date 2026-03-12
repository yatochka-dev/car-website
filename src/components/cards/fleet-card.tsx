'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Users, Calendar, CheckCircle, XCircle, X, Car } from 'lucide-react'
import { FleetVehicle } from '@/payload-types'

interface FleetCardProps {
  vehicle: FleetVehicle
  allVehicles: FleetVehicle[]
}

// ─── Availability Check Logic ────────────────────────────────────────────────

function checkAvailability(
  bookings: {
    startDate: string
    endDate: string
    customerName?: string | null
    notes?: string | null
    id?: string | null
  }[],
  startDate: string,
  endDate: string,
): boolean {
  const requestStart = new Date(startDate)
  const requestEnd = new Date(endDate)

  for (const booking of bookings) {
    const bookingStart = new Date(booking.startDate)
    const bookingEnd = new Date(booking.endDate)

    // Check if date ranges overlap
    if (requestStart <= bookingEnd && requestEnd >= bookingStart) {
      return false // Not available - dates overlap
    }
  }

  return true // Available
}

function getAvailableVehicles(
  vehicles: FleetVehicle[],
  startDate: string,
  endDate: string,
  excludeId: string,
): FleetVehicle[] {
  console.log(vehicles)
  return vehicles.filter(
    (v) => v.id !== excludeId && checkAvailability(v.bookings, startDate, endDate),
  )
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Alternatives Dialog ─────────────────────────────────────────────────────

interface AlternativesDialogProps {
  isOpen: boolean
  onClose: () => void
  availableVehicles: FleetVehicle[]
  startDate: string
  endDate: string
}

function AlternativesDialog({
  isOpen,
  onClose,
  availableVehicles,
  startDate,
  endDate,
}: AlternativesDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="alternatives-title"
        className="relative w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 id="alternatives-title" className="text-xl font-bold text-foreground">
              רכבים פנויים בתאריכים
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="סגור"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {availableVehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Car className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground">אין רכבים פנויים בתאריכים אלו</p>
              <p className="text-sm text-muted-foreground mt-1">
                נסו לבחור תאריכים אחרים או צרו קשר לעזרה
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {availableVehicles.map((v) => (
                <div
                  key={v.id}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={v.image} alt={v.name} fill className="object-cover" sizes="128px" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground truncate">{v.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm shrink-0">
                        <Users className="w-4 h-4" />
                        <span>{v.seats}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {v.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {v.tags.slice(0, 2).map((t) => (
                        <span
                          key={t.id || t.tag}
                          className="px-2 py-0.5 rounded-full bg-background text-xs text-primary font-medium border border-primary/20"
                        >
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="self-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                  >
                    להזמנה
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface">
          <a
            href="#contact"
            onClick={onClose}
            className="block w-full py-3 rounded-lg border border-primary/30 text-center text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            צרו קשר לעזרה נוספת
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── FleetCard Component ─────────────────────────────────────────────────────

export function FleetCard({ vehicle, allVehicles }: FleetCardProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [availabilityResult, setAvailabilityResult] = useState<'available' | 'unavailable' | null>(
    null,
  )
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [availableAlternatives, setAvailableAlternatives] = useState<FleetVehicle[]>([])

  const handleCheckAvailability = () => {
    if (!startDate || !endDate) return

    const isAvailable = checkAvailability(vehicle.bookings, startDate, endDate)
    setAvailabilityResult(isAvailable ? 'available' : 'unavailable')

    if (!isAvailable) {
      // Pre-calculate available alternatives
      const alternatives = getAvailableVehicles(allVehicles, startDate, endDate, vehicle.id)
      setAvailableAlternatives(alternatives)
    }
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    setAvailabilityResult(null)
    setShowDatePicker(false)
  }

  const handleOpenAlternatives = useCallback(() => {
    setShowAlternatives(true)
  }, [])

  const handleCloseAlternatives = useCallback(() => {
    setShowAlternatives(false)
  }, [])

  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <article className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(200,170,100,0.08)]">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Tags */}
          <div className="absolute top-4 right-4 flex gap-2">
            {vehicle.tags.map((t) => (
              <span
                key={t.id || t.tag}
                className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs text-primary font-medium border border-primary/20"
              >
                {t.tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {vehicle.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>{vehicle.seats}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{vehicle.description}</p>

          {/* Availability Check Section */}
          {!showDatePicker ? (
            <button
              onClick={() => setShowDatePicker(true)}
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-surface text-foreground text-sm font-medium hover:border-primary/30 hover:text-primary transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              בדיקת זמינות
            </button>
          ) : (
            <div className="mt-2 p-4 rounded-lg border border-border bg-surface-elevated space-y-4">
              {/* Header with close button */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">בחרו תאריכים</span>
                <button
                  onClick={handleReset}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="סגור"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor={`start-${vehicle.id}`} className="text-xs text-muted-foreground">
                    מתאריך
                  </label>
                  <input
                    type="date"
                    id={`start-${vehicle.id}`}
                    value={startDate}
                    min={today}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      setAvailabilityResult(null)
                      if (endDate && e.target.value > endDate) {
                        setEndDate(e.target.value)
                      }
                    }}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor={`end-${vehicle.id}`} className="text-xs text-muted-foreground">
                    עד תאריך
                  </label>
                  <input
                    type="date"
                    id={`end-${vehicle.id}`}
                    value={endDate}
                    min={startDate || today}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                      setAvailabilityResult(null)
                    }}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
              </div>

              {/* Check Button */}
              <button
                onClick={handleCheckAvailability}
                disabled={!startDate || !endDate}
                className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                בדיקת זמינות
              </button>

              {/* Result */}
              {availabilityResult && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-md ${
                    availabilityResult === 'available'
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  {availabilityResult === 'available' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-emerald-400">הרכב פנוי!</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(startDate)} - {formatDate(endDate)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <div className="flex-1 space-y-0.5">
                        <p className="text-sm font-medium text-red-400">הרכב תפוס בתאריכים אלו</p>
                        <p className="text-xs text-muted-foreground">
                          נסו תאריכים אחרים או צפו ברכבים פנויים
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Show Alternatives Button */}
              {availabilityResult === 'unavailable' && (
                <button
                  onClick={handleOpenAlternatives}
                  className="w-full py-2.5 rounded-md border border-primary/30 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  צפייה ברכבים פנויים
                </button>
              )}
            </div>
          )}

          <a
            href="#contact"
            className="inline-flex items-center justify-center py-3 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            לפרטים והזמנה
          </a>
        </div>
      </article>

      {/* Alternatives Dialog */}
      <AlternativesDialog
        isOpen={showAlternatives}
        onClose={handleCloseAlternatives}
        availableVehicles={availableAlternatives}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  )
}
