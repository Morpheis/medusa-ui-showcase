import { Button, Heading, IconButton, Tooltip } from '@medusajs/ui'
import { InformationCircle, Plus, Trash } from '@medusajs/icons'
import { HbOrderLineItem, SalesType } from '../types'
import { formatPrice, formatHashRate, formatEfficiency } from '../utils/formatters'

type LineItemsViewProps = {
  salesType: SalesType
  lineItems: HbOrderLineItem[]
  editMode: boolean
}

const BUY_HOST_COLUMNS = [
  'product', 'variant', 'quantity', 'vendor_price', 'margin_price',
  'discount', 'subtotal', 'tax', 'shipping', 'total',
]

const SEND_HOST_COLUMNS = [
  'product', 'quantity', 'hashrate', 'efficiency', 'power_consumption', 'shipping', 'total',
]

export function LineItemsView({ salesType, lineItems, editMode }: LineItemsViewProps) {
  const columns = salesType === SalesType.SEND_HOST ? SEND_HOST_COLUMNS : BUY_HOST_COLUMNS

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading level="h2">Line Items</Heading>
        {editMode && (
          <Button variant="secondary" size="small" className="w-36 h-8">
            <Plus />
            Add Line Item
          </Button>
        )}
      </div>

      <div className="overflow-x-auto shadow-elevation-card-rest bg-ui-bg-base rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.includes('product') && (
                <th className="text-left px-3 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
              )}
              {columns.includes('variant') && (
                <th className="text-left px-3 py-3 text-xs font-medium text-gray-500 uppercase">Variant</th>
              )}
              {columns.includes('quantity') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Qty</th>
              )}
              {columns.includes('hashrate') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Hashrate</th>
              )}
              {columns.includes('efficiency') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Efficiency</th>
              )}
              {columns.includes('power_consumption') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Power</th>
              )}
              {columns.includes('vendor_price') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Vendor Price</th>
              )}
              {columns.includes('margin_price') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">HB Margin</th>
              )}
              {columns.includes('discount') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Discount</th>
              )}
              {columns.includes('shipping') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Shipping</th>
              )}
              {columns.includes('tax') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Tax</th>
              )}
              {columns.includes('total') && (
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
              )}
              {editMode && <th className="w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {lineItems.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (editMode ? 1 : 0)} className="text-center py-8 text-gray-400">
                  No line items. {editMode ? 'Click "Add Line Item" to get started.' : ''}
                </td>
              </tr>
            ) : (
              lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {columns.includes('product') && (
                    <td className="px-3 py-2 text-ui-fg-subtle">{item.product_title}</td>
                  )}
                  {columns.includes('variant') && (
                    <td className="px-3 py-2 text-ui-fg-subtle">{item.variant_title}</td>
                  )}
                  {columns.includes('quantity') && (
                    <td className="px-3 py-2 text-right">{item.quantity}</td>
                  )}
                  {columns.includes('hashrate') && (
                    <td className="px-3 py-2 text-right">{formatHashRate(item.hashrate)}</td>
                  )}
                  {columns.includes('efficiency') && (
                    <td className="px-3 py-2 text-right">{formatEfficiency(item.efficiency)}</td>
                  )}
                  {columns.includes('power_consumption') && (
                    <td className="px-3 py-2 text-right">{item.power_consumption}W</td>
                  )}
                  {columns.includes('vendor_price') && (
                    <td className="px-3 py-2 text-right">{formatPrice(item.vendor_price)}</td>
                  )}
                  {columns.includes('margin_price') && (
                    <td className="px-3 py-2 text-right">{formatPrice(item.margin_price)}</td>
                  )}
                  {columns.includes('discount') && (
                    <td className="px-3 py-2 text-right">{formatPrice(item.discount)}</td>
                  )}
                  {columns.includes('shipping') && (
                    <td className="px-3 py-2 text-right">{formatPrice(item.shipping)}</td>
                  )}
                  {columns.includes('tax') && (
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center gap-x-2 justify-end">
                        {formatPrice(item.tax)}
                        <Tooltip content={item.tax_lines?.map((l: any) => `${l.name}: ${l.rate}%`).join(', ') || 'No tax info'}>
                          <InformationCircle className="text-gray-400 w-3.5 h-3.5" />
                        </Tooltip>
                      </div>
                    </td>
                  )}
                  {columns.includes('total') && (
                    <td className="px-3 py-2 text-right font-medium">{formatPrice(item.total)}</td>
                  )}
                  {editMode && (
                    <td className="px-2 py-2">
                      <IconButton variant="transparent">
                        <Trash className="text-ui-fg-error" />
                      </IconButton>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
