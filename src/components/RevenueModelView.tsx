import { Button, Container, Heading, Label, Select } from '@medusajs/ui'
import { HbOrder, RevenueType, SalesType, SubscriptionInterval } from '../types'

export function RevenueModelView({ hbOrder }: { hbOrder: HbOrder }) {
  const interval = hbOrder.subscription_plan_override?.interval || SubscriptionInterval.MONTHLY
  const period = hbOrder.subscription_plan_override?.period || 6
  const isFinalized = Boolean(hbOrder?.metadata?.finalized)

  if (hbOrder.sales_type === SalesType.BUY_SEND) {
    return null
  }

  const metadata = hbOrder.subscription_plan_override?.metadata

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <Heading level="h2">Revenue Model</Heading>
        <Button
          disabled={isFinalized}
          variant="secondary"
          size="small"
          className={`px-4 py-1 text-normal font-normal ${
            hbOrder.revenue_type === RevenueType.FIXED_FEE
              ? 'bg-[#9999FF] hover:bg-[#9999FF] disabled:bg-[#9999FF] text-black disabled:text-black'
              : 'text-gray-500 disabled:hidden'
          }`}
        >
          Fixed Fee
        </Button>
        <Button
          disabled={isFinalized}
          variant="secondary"
          size="small"
          className={`px-4 py-1 text-normal font-normal ${
            hbOrder.revenue_type === RevenueType.PROFIT_SHARE
              ? 'bg-[#9999FF] hover:bg-[#9999FF] disabled:bg-[#9999FF] text-black disabled:text-black'
              : 'text-gray-500 disabled:hidden'
          }`}
        >
          Profit Share
        </Button>
      </div>

      <Container className="flex flex-col gap-4">
        <div className="flex flex-row gap-12 my-4">
          <div className="flex flex-col gap-y-2">
            <Label className="text-sm font-medium">Billing Frequency</Label>
            <Select disabled={isFinalized} value={interval} onValueChange={() => {}}>
              <Select.Trigger className="rounded-md px-4 py-1 w-full text-sm capitalize">
                {interval.toLowerCase()}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="MONTHLY">MONTHLY</Select.Item>
              </Select.Content>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label className="text-sm font-medium">Contract Length</Label>
            <Select disabled={isFinalized} value={period?.toString()} onValueChange={() => {}}>
              <Select.Trigger className="rounded-md px-4 py-1 w-full text-sm">
                {period} {interval === SubscriptionInterval.MONTHLY ? 'Months' : 'Years'}
              </Select.Trigger>
              <Select.Content>
                {[1, 2, 3, 4, 5, 6, 12, 24, 36, 48].map((num) => (
                  <Select.Item key={num} value={num.toString()}>
                    {num} {interval === SubscriptionInterval.MONTHLY ? 'Months' : 'Years'}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>

        {/* Hosting Contract Configuration */}
        {metadata && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-y-3">
              <Label className="text-xs text-gray-400 font-bold">Deposit & Setup</Label>
              <div className="flex justify-between">
                <span className="text-gray-500">Vendor Deposit Interval</span>
                <span>{metadata.vendor_deposit_interval} month(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">HB Deposit Interval</span>
                <span>{metadata.hb_deposit_interval} month(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vendor Setup Fee</span>
                <span>${metadata.vendor_setup_fee_usd?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">HB Setup Fee</span>
                <span>${metadata.hb_setup_fee_usd?.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <Label className="text-xs text-gray-400 font-bold">Rates & Fees</Label>
              <div className="flex justify-between">
                <span className="text-gray-500">Vendor Electricity Rate</span>
                <span>${metadata.vendor_electricity_rate_usd?.toFixed(4)}/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">HB Electricity Rate</span>
                <span>${metadata.hb_electricity_rate_usd?.toFixed(4)}/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">HB Platform Fee</span>
                <span>${metadata.hb_platform_fee_usd?.toFixed(2)}/unit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Overclock %</span>
                <span>{metadata.overclock_percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Power Variance %</span>
                <span>{metadata.power_consumption_variance_percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Min Uptime %</span>
                <span>{metadata.minimum_up_time_percentage}%</span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
