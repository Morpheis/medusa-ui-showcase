import { Container, Heading } from '@medusajs/ui'
import { HbOrder } from '../types'
import { LabelValuePair } from './LabelValuePair'

export function OrderBalanceView({ hbOrder }: { hbOrder?: HbOrder }) {
  if (!hbOrder) return null
  if (!hbOrder?.metadata?.finalized) return null

  return (
    <div className="flex flex-col gap-y-4 max-w-md">
      <Heading level="h2">Order Balance</Heading>
      <Container className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 max-w-md">
          <LabelValuePair label="Contract Total" currencyValue={hbOrder.balance?.contract_total} />
          <LabelValuePair
            label="Paid Total"
            valueClassName="text-green-500"
            currencyValue={hbOrder.balance?.paid_total}
          />
          <LabelValuePair
            label="Contract Balance"
            currencyValue={hbOrder.balance?.contract_balance}
          />
          <LabelValuePair
            label="Current Balance"
            currencyValue={hbOrder.balance?.current_balance}
            labelTooltip="Total amount of unpaid invoices that have issued status"
          />
          <LabelValuePair
            label="Past Due"
            valueClassName="text-red-500"
            currencyValue={hbOrder.balance?.past_due_balance}
          />
        </div>
      </Container>
    </div>
  )
}
