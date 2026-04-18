import { FleetCard } from '@/components/cards/fleet-card'
import { SectionHeading } from '@/components/ui/section-heading'
import type { HomeFleetData } from '@/lib/site-globals'
import type { FleetVehicle } from '@/payload-types'

type Props = HomeFleetData & {
  vehicles: FleetVehicle[]
}

export function FleetSection({ sectionTitle, sectionSubtitle, vehicles }: Props) {
  return (
    <section id="fleet" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vehicles.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} allVehicles={vehicles} />
          ))}
        </div>
      </div>
    </section>
  )
}
