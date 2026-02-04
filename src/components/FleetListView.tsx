import { Container, Heading, Text } from '@medusajs/ui'
import { HbOrder, SalesType } from '../types'

export function FleetListView({ hbOrder }: { hbOrder: HbOrder }) {
  const showFleetsSection =
    hbOrder?.metadata?.finalized &&
    (hbOrder?.sales_type === SalesType.SEND_HOST || hbOrder?.sales_type === SalesType.BUY_HOST)

  if (!showFleetsSection) return null

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2">Fleets</Heading>
      <Container className="flex flex-col items-center justify-center p-8 gap-y-2 min-h-48">
        <Text className="text-gray-500">
          Fleet management would be displayed here. Fleets track mining performance,
          hashrate, and revenue for grouped mining units.
        </Text>
      </Container>
    </div>
  )
}
