import { IconButton } from '@medusajs/ui'
import { ArrowDownTray } from '@medusajs/icons'
import { HbOrder, SalesType, HostingContractMetadata } from '../types'
import { formatDate, formatHashRate, formatPrice } from '../utils/formatters'

function LabelValuePair({
  label,
  labelClassName = '',
  value,
  currencyValue,
  zeroFillCurrencyValue = false,
}: {
  label: string
  labelClassName?: string
  value?: string
  currencyValue?: number
  zeroFillCurrencyValue?: boolean
}) {
  const isNum = (v: any): v is number => typeof v === 'number' && !isNaN(v)
  return (
    <div className="flex flex-row justify-between gap-2 w-full">
      <label className={`text-xs font-light text-gray-500 flex flex-row gap-2 ${labelClassName}`}>
        {label}
      </label>
      <label className="text-xs font-light text-gray-400 flex flex-row gap-2">
        {value}
        {isNum(currencyValue)
          ? Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }).format(currencyValue)
          : zeroFillCurrencyValue
          ? '0'
          : ''}
      </label>
    </div>
  )
}

export function CustomerOrderSummary({ hbOrder }: { hbOrder: HbOrder }) {
  const { hardware, hosting_contract, customer } = hbOrder?.calculations_snapshot || {}

  const {
    hb_setup_fee_usd = 0,
    vendor_setup_fee_usd = 0,
    hb_platform_fee_usd = 0,
    hb_deposit_interval = 0,
    vendor_deposit_interval = 0,
  } = (hbOrder?.subscription_plan_override?.metadata || {}) as Partial<HostingContractMetadata>

  const setupFee = (hb_setup_fee_usd || 0) + (vendor_setup_fee_usd || 0)
  const platformFee = hb_platform_fee_usd || 0
  const depositInterval = (hb_deposit_interval || 0) + (vendor_deposit_interval || 0)
  const totalUnits = hbOrder?.line_items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const taxRate = hbOrder?.metadata?.tax_rate || 0

  const hasHosting =
    hbOrder?.sales_type === SalesType.BUY_HOST || hbOrder?.sales_type === SalesType.SEND_HOST
  const hasHardware =
    hbOrder?.sales_type === SalesType.BUY_HOST || hbOrder?.sales_type === SalesType.BUY_SEND

  return (
    <div className="relative shadow-elevation-card-rest bg-ui-bg-base rounded-md">
      <IconButton variant="transparent" className="absolute top-2 right-2">
        <ArrowDownTray className="w-4 h-4" />
      </IconButton>

      <div className="flex flex-col gap-3 p-6 rounded-md mx-auto">
        {/* Logo placeholder */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-sm">
            H
          </div>
          <span className="text-lg font-bold text-gray-800">Hashbranch</span>
        </div>

        <h2 className="text-lg font-bold">Order Quote - {formatDate(new Date())}</h2>

        <hr />

        {/* Line items table */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50">
              <tr>
                <th className="px-2 py-2">Condition</th>
                <th className="px-2 py-2">Product</th>
                <th className="px-2 py-2">Qty</th>
                <th className="px-2 py-2">Hashrate</th>
                {hasHardware && (
                  <>
                    <th className="px-2 py-2">Price</th>
                    <th className="px-2 py-2">Shipping</th>
                    <th className="px-2 py-2">Tax</th>
                    <th className="px-2 py-2">Total</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {hbOrder?.line_items?.map((item) => (
                <tr className="bg-white border-b border-gray-200" key={item.id}>
                  <td className="px-2 py-2">{item.catalog?.condition || 'N/A'}</td>
                  <td className="px-2 py-2">
                    {[item.catalog?.manufacturer, item.catalog?.make, item.product_title]
                      .filter(Boolean)
                      .join(' ')}
                  </td>
                  <td className="px-2 py-2">{item.quantity}</td>
                  <td className="px-2 py-2">{formatHashRate(item.hashrate)}</td>
                  {hasHardware && (
                    <>
                      <td className="px-2 py-2">
                        {formatPrice(item.vendor_price + item.margin_price - item.discount)}
                      </td>
                      <td className="px-2 py-2">{formatPrice(item.shipping)}</td>
                      <td className="px-2 py-2">{formatPrice(item.tax)}</td>
                      <td className="px-2 py-2">{formatPrice(item.total)}</td>
                    </>
                  )}
                </tr>
              ))}
              {(!hbOrder.line_items || hbOrder.line_items.length === 0) && (
                <tr>
                  <td colSpan={8} className="px-2 py-4 text-center text-gray-400">
                    No line items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {hasHardware && (
          <LabelValuePair
            label="Hardware Total"
            currencyValue={hardware?.total_weblist_price}
            zeroFillCurrencyValue
            labelClassName="font-bold"
          />
        )}

        {hasHosting && (
          <>
            <LabelValuePair
              label="Hosting Downpayment"
              currencyValue={customer?.total_upfront_hosting_cost}
              zeroFillCurrencyValue
              labelClassName="font-bold"
            />
            <div className="flex flex-col gap-y-3 pl-4 max-w-[300px]">
              <LabelValuePair
                label="Setup Fee"
                currencyValue={customer?.total_setup_cost}
                zeroFillCurrencyValue
              />
              <LabelValuePair
                label="Platform Fee"
                currencyValue={customer?.total_recurring_platform_fee}
                zeroFillCurrencyValue
              />
              <LabelValuePair
                label="Hosting Prepay"
                currencyValue={customer?.total_prepay}
                zeroFillCurrencyValue
              />
            </div>
          </>
        )}

        {hasHardware && (
          <>
            <LabelValuePair
              label="Estimated Shipping & Handling"
              currencyValue={hardware?.total_shipping}
              zeroFillCurrencyValue
              labelClassName="font-bold"
            />
            <LabelValuePair
              label={`Sales Tax (${taxRate}%)`}
              currencyValue={hardware?.total_tax}
              zeroFillCurrencyValue
              labelClassName="font-bold"
            />
          </>
        )}

        <hr />

        <LabelValuePair
          label="Total Due Now"
          labelClassName="font-bold"
          currencyValue={customer?.total_upfront_payment}
          zeroFillCurrencyValue
        />

        <hr />

        {hasHosting && (
          <>
            <LabelValuePair
              label="Hosting Rate"
              value={`$${customer?.electricity_kwh_cost?.toFixed(4) || '0.0000'}/kWh`}
            />
            <LabelValuePair
              label="Contract Length"
              value={
                hosting_contract?.period
                  ? `${hosting_contract.period} ${hosting_contract.interval?.toLowerCase().replace('ly', 's')}`
                  : ''
              }
            />
            <LabelValuePair
              label="Monthly Payments"
              labelClassName="font-bold"
              currencyValue={customer?.total_recurring_cost}
              zeroFillCurrencyValue
            />
          </>
        )}

        <div className="flex flex-row justify-between gap-2 w-full text-sm mt-4 text-gray-500 italic">
          All prices and terms are subject to change until the order is finalized and accepted by
          Hashbranch.
        </div>
      </div>
    </div>
  )
}
