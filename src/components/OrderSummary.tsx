import { Container, Heading } from '@medusajs/ui'
import { HbOrder, RevenueType, SalesType } from '../types'
import { LabelValuePair } from './LabelValuePair'
import { formatHashRate, formatPowerConsumptionInKWh } from '../utils/formatters'

export function OrderSummary({ hbOrder }: { hbOrder: HbOrder }) {
  const { hardware, hosting_contract, hashbranch, mining_facility, customer } =
    hbOrder?.calculations_snapshot || {}

  const isFixedFee = hbOrder?.revenue_type === RevenueType.FIXED_FEE
  const isHosting =
    hbOrder?.sales_type === SalesType.BUY_HOST || hbOrder?.sales_type === SalesType.SEND_HOST

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-4">
        {/* ASICs Margin */}
        <Container className="flex flex-col gap-3 max-w-md">
          <Heading level="h2">ASICs Margin</Heading>
          <LabelValuePair label="Vendor" value={hardware?.vendors?.join(', ') || 'None'} />
          <LabelValuePair
            label="Total Units"
            value={
              hardware?.total_quantity
                ? `${hardware.total_quantity} ${hardware.total_quantity > 1 ? 'Units' : 'Unit'}`
                : '0'
            }
          />
          <LabelValuePair
            label="Total Hashrate"
            value={hardware?.total_hashrate ? formatHashRate(hardware.total_hashrate) : '0'}
          />
          <hr />
          <LabelValuePair
            label="Vendor Sale Price"
            currencyValue={hardware?.total_vendor_price}
            zeroFillCurrencyValue
            valueClassName="text-red-400"
          />
          <LabelValuePair
            label="HB Unit Markup"
            value={hardware?.total_hb_margin ? `+$${hardware.total_hb_margin.toFixed(2)}` : '0'}
            valueClassName="text-green-400"
          />
          <LabelValuePair
            label="Hardware Subtotal"
            currencyValue={hardware?.total_weblist_price}
            zeroFillCurrencyValue
          />
          <hr />
          <LabelValuePair
            label="Shipping"
            currencyValue={hardware?.total_shipping}
            zeroFillCurrencyValue
            valueClassName="text-red-400"
          />
          <LabelValuePair
            label="Sales Tax"
            currencyValue={hardware?.total_tax}
            zeroFillCurrencyValue
            valueClassName="text-red-400"
          />
          <hr />
          <LabelValuePair
            label="Hardware Total"
            labelClassName="text-gray-400 font-bold"
            currencyValue={hardware?.total}
            zeroFillCurrencyValue
          />
        </Container>

        {/* Profit Analysis */}
        {isFixedFee && isHosting && (
          <Container className="flex flex-col gap-3">
            <Heading level="h2">Profit Analysis</Heading>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <div className="flex flex-col gap-y-3">
                <LabelValuePair label="Upfront" labelClassName="text-gray-400 font-bold" />
                <LabelValuePair
                  label="ASIC Margin"
                  valueClassName="text-green-400"
                  currencyValue={hardware?.total_hb_margin}
                  zeroFillCurrencyValue
                />
                <LabelValuePair
                  label="Setup Fee"
                  valueClassName="text-green-400"
                  currencyValue={hashbranch?.total_setup_profit}
                  zeroFillCurrencyValue
                />
                <LabelValuePair
                  label="First Month Margin"
                  valueClassName="text-green-400"
                  currencyValue={hashbranch?.total_recurring_profit}
                  zeroFillCurrencyValue
                />
                <hr className="my-[4px]" />
                <LabelValuePair
                  label="Total Upfront"
                  labelClassName="text-gray-400"
                  currencyValue={hashbranch?.total_upfront_profit}
                  zeroFillCurrencyValue
                  valueClassName="text-green-400"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <LabelValuePair label="Monthly" labelClassName="text-gray-400 font-bold" />
                <LabelValuePair
                  label="Hosting"
                  currencyValue={hashbranch?.total_recurring_electricity_profit}
                  zeroFillCurrencyValue
                  valueClassName="text-green-400"
                />
                <LabelValuePair
                  label="Platform Fee"
                  currencyValue={hashbranch?.total_recurring_platform_profit}
                  zeroFillCurrencyValue
                  valueClassName="text-green-400"
                />
                <hr />
                <LabelValuePair
                  label={`${hosting_contract?.interval?.toLowerCase() ?? ''} Total`}
                  labelClassName="text-gray-400 capitalize"
                  currencyValue={hashbranch?.total_recurring_profit}
                  zeroFillCurrencyValue
                  valueClassName="text-green-400"
                />
              </div>

              <hr className="col-span-2" />

              <div className="flex flex-col gap-y-3">
                <LabelValuePair
                  label="Contract Length"
                  value={
                    hosting_contract?.period
                      ? `${hosting_contract.period} ${hosting_contract.interval?.toLowerCase().replace('ly', '')}`
                      : ''
                  }
                  labelClassName="capitalize"
                />
                <LabelValuePair
                  label="Recurring Profit"
                  currencyValue={hashbranch?.total_recurring_profit}
                  zeroFillCurrencyValue
                  valueClassName="text-green-400"
                />
                <LabelValuePair
                  label="Total Contract Profit"
                  labelClassName="text-gray-400 font-bold"
                  currencyValue={hashbranch?.total_contract_profit}
                  zeroFillCurrencyValue
                  valueClassName="text-green-400"
                />
              </div>
            </div>
          </Container>
        )}
      </div>

      {/* Hosting Details */}
      {isFixedFee && isHosting && (
        <Container className="flex flex-col gap-4">
          <Heading level="h2">Hosting Details</Heading>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <div className="flex flex-col gap-y-3">
              <LabelValuePair
                label="Rates & Consumption"
                labelClassName="text-md text-gray-400 font-bold"
              />
              <LabelValuePair
                label="Hourly Consumption"
                value={formatPowerConsumptionInKWh(hardware?.total_power_consumption_per_hour, 2, '0')}
              />
              <LabelValuePair
                label="Daily Consumption"
                value={formatPowerConsumptionInKWh(hardware?.total_power_consumption_per_day, 2, '0')}
              />
              <LabelValuePair
                label="Monthly Consumption"
                value={formatPowerConsumptionInKWh(hardware?.total_power_consumption_per_month, 2, '0')}
              />
              <LabelValuePair
                label="Base Hosting Rate"
                valueClassName="text-red-400"
                value={
                  mining_facility?.electricity_kwh_cost
                    ? `$${mining_facility.electricity_kwh_cost.toFixed(4)}/kWh`
                    : '0'
                }
              />
              <LabelValuePair
                label="Hosting Margin"
                value={
                  hashbranch?.electricity_kwh_markup
                    ? `$${hashbranch.electricity_kwh_markup.toFixed(4)}/kWh`
                    : '0'
                }
                valueClassName="text-green-400"
              />
              <LabelValuePair
                label="Customer Hosting Rate"
                value={
                  customer?.electricity_kwh_cost
                    ? `$${customer.electricity_kwh_cost.toFixed(4)}/kWh`
                    : '0'
                }
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <LabelValuePair
                label="Setup Fee"
                labelClassName="text-md text-gray-400 font-bold"
              />
              <LabelValuePair
                label="Mining Facility Fee"
                currencyValue={mining_facility?.total_setup_cost}
                zeroFillCurrencyValue
              />
              <LabelValuePair
                label="Hashbranch Fee"
                valueClassName="text-green-400"
                currencyValue={hashbranch?.total_setup_profit}
                zeroFillCurrencyValue
              />
              <hr />
              <LabelValuePair
                label="Total Setup Fee"
                currencyValue={customer?.total_setup_cost}
                zeroFillCurrencyValue
              />
            </div>

            <hr className="col-span-2" />

            <div className="flex flex-col gap-y-3">
              <LabelValuePair
                label="Mining Facility Payments"
                labelClassName="text-md text-gray-400 font-bold"
              />
              <LabelValuePair
                label="Monthly Hosting Payment"
                currencyValue={mining_facility?.total_recurring_cost}
                zeroFillCurrencyValue
                valueClassName="text-red-400"
              />
              <LabelValuePair
                label="Setup Fee to Facility"
                currencyValue={mining_facility?.total_setup_cost}
                zeroFillCurrencyValue
                valueClassName="text-red-400"
              />
              <hr />
              <LabelValuePair
                label="Prepay to Facility"
                currencyValue={mining_facility?.total_prepay}
                zeroFillCurrencyValue
                valueClassName="text-red-400"
              />
              <LabelValuePair
                label="Initial Payment to Facility"
                labelClassName="text-gray-400 font-bold"
                currencyValue={mining_facility?.total_upfront_cost}
                zeroFillCurrencyValue
                valueClassName="text-red-400"
              />
              <hr />
              <LabelValuePair
                label="Monthly Payment to Facility"
                labelClassName="text-gray-400"
                currencyValue={mining_facility?.total_recurring_cost}
                zeroFillCurrencyValue
                valueClassName="text-red-400"
              />
              <LabelValuePair
                label="Total Contract Payment to Facility"
                labelClassName="text-gray-400 font-bold"
                currencyValue={mining_facility?.total_contract_cost}
                zeroFillCurrencyValue
                valueClassName="text-red-400"
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <LabelValuePair
                label="Customer Charges"
                labelClassName="text-md text-gray-400 font-bold"
              />
              <hr />
              <LabelValuePair
                label="Initial Payment from Customer (Hosting Only)"
                labelClassName="text-gray-400 font-bold"
                currencyValue={customer?.total_upfront_hosting_cost}
                zeroFillCurrencyValue
                valueClassName="text-gray-400 font-bold"
              />
              <LabelValuePair
                label="Setup Fee"
                labelClassName="pl-2"
                currencyValue={customer?.total_setup_cost}
                zeroFillCurrencyValue
                valueClassName="text-gray-400"
              />
              <LabelValuePair
                label="Platform Fee"
                labelClassName="pl-2"
                currencyValue={customer?.total_recurring_platform_fee}
                zeroFillCurrencyValue
                valueClassName="text-gray-400"
              />
              <LabelValuePair
                label="Hosting Prepay"
                labelClassName="pl-2"
                currencyValue={customer?.total_prepay}
                zeroFillCurrencyValue
                valueClassName="text-gray-400"
              />
              <LabelValuePair
                label="Initial Payment from Customer (Hosting + Hardware)"
                labelClassName="text-gray-400 font-bold"
                currencyValue={customer?.total_upfront_payment}
                zeroFillCurrencyValue
                valueClassName="text-gray-400 font-bold"
              />
              <hr />
              <LabelValuePair
                label="Monthly Payment from Customer"
                labelClassName="text-gray-400"
                currencyValue={customer?.total_recurring_cost}
                zeroFillCurrencyValue
                valueClassName="text-gray-400 font-bold"
              />
              <LabelValuePair
                label="Total Contract Payment from Customer (Hosting Only)"
                labelClassName="text-gray-400 font-bold"
                currencyValue={customer?.total_contract_hosting_cost}
                zeroFillCurrencyValue
                valueClassName="text-gray-400 font-bold"
              />
              <LabelValuePair
                label="Total Contract Payment from Customer (Hosting + Hardware)"
                labelClassName="text-gray-400 font-bold"
                currencyValue={customer?.total_contract_cost}
                zeroFillCurrencyValue
                valueClassName="text-gray-400 font-bold"
              />
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}
