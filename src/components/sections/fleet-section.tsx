import { SectionHeading } from '@/components/ui/section-heading'
import { FleetCard } from '@/components/cards/fleet-card'
import { FleetVehicle, SiteConfig } from '@/payload-types'

type Props = Omit<SiteConfig['fleet'], 'vehicles'> & {
  vehicles: FleetVehicle[]
}

export function FleetSection({ sectionTitle, sectionSubtitle, vehicles }: Props) {
  console.log(vehicles)
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
