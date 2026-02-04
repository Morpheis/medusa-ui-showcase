import { Button } from '@medusajs/ui'
import { HbOrder } from '../types'

export function FinalizeOrderView({ hbOrder }: { hbOrder?: HbOrder }) {
  if (!hbOrder) return null

  const isFinalized = Boolean(hbOrder.metadata?.finalized)
  const canUnfinalize = isFinalized && !hbOrder.adjustments?.length && !hbOrder.invoices?.length

  if (canUnfinalize) {
    return (
      <div className="flex flex-row justify-end gap-4">
        <Button variant="primary" size="large">
          Unfinalize Order
        </Button>
      </div>
    )
  }

  if (isFinalized) return null

  return (
    <div className="flex flex-row justify-end gap-4">
      <Button variant="primary" size="large">
        Finalize Order
      </Button>
    </div>
  )
}
