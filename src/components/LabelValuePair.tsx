import { Label, Tooltip } from '@medusajs/ui'
import { InformationCircle } from '@medusajs/icons'

type LabelValuePairProps = {
  label: string
  labelClassName?: string
  value?: string
  currencyValue?: number
  labelTooltip?: string
  valueClassName?: string
  zeroFillCurrencyValue?: boolean
}

export function LabelValuePair({
  label,
  labelClassName = '',
  value,
  currencyValue,
  labelTooltip,
  valueClassName = '',
  zeroFillCurrencyValue = false,
}: LabelValuePairProps) {
  const isNumber = (v: any): v is number => typeof v === 'number' && !isNaN(v)

  return (
    <div className="flex flex-row justify-between gap-2 w-full">
      <Label className={`text-xs font-light text-gray-500 flex flex-row gap-2 ${labelClassName}`}>
        {label}
        {labelTooltip && (
          <Tooltip content={labelTooltip}>
            <InformationCircle className="w-4 h-4" />
          </Tooltip>
        )}
      </Label>
      <Label className={`text-xs font-light text-gray-400 flex flex-row gap-2 ${valueClassName}`}>
        {value}
        {isNumber(currencyValue)
          ? Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }).format(Number(currencyValue))
          : zeroFillCurrencyValue
          ? '0'
          : ''}
      </Label>
    </div>
  )
}
