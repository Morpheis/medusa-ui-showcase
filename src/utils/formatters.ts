import { format } from 'date-fns'

export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatCurrency(value: number | null | undefined): string {
  return formatPrice(value)
}

export function formatHashRate(value: number | null | undefined): string {
  if (!value) return '0 TH/s'
  if (value >= 1000) return `${(value / 1000).toFixed(1)} PH/s`
  return `${value} TH/s`
}

export function formatEfficiency(value: number | null | undefined): string {
  if (!value) return '0 J/TH'
  return `${value} J/TH`
}

export function formatPowerConsumptionInKWh(
  value: number | null | undefined,
  decimals = 2,
  fallback = '0'
): string {
  if (!value) return fallback + ' kWh'
  return `${value.toFixed(decimals)} kWh`
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy')
}

export function formatDateUTC(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy')
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString()
}
