import { Button, Heading, Table } from '@medusajs/ui'
import { Plus } from '@medusajs/icons'
import { HbOrder } from '../types'
import { formatCurrency, formatDateTime } from '../utils/formatters'

export function POListView({ hbOrder }: { hbOrder: HbOrder }) {
  if (!hbOrder?.metadata?.finalized || !hbOrder.customer?.id) return null

  const purchaseOrders = hbOrder.purchase_orders || []

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <Heading level="h2">Purchase Orders</Heading>
        <Button variant="secondary">
          <Plus className="mr-2" />
          Create Purchase Order
        </Button>
      </div>

      <Table className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PO Number</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {purchaseOrders.map((po) => (
            <Table.Row key={po.id}>
              <Table.Cell>{po.po_number}</Table.Cell>
              <Table.Cell className="capitalize">{po.status.toLowerCase()}</Table.Cell>
              <Table.Cell>{formatCurrency(po.amount)}</Table.Cell>
              <Table.Cell className="text-xs">{formatDateTime(po.created_at)}</Table.Cell>
            </Table.Row>
          ))}
          {purchaseOrders.length === 0 && (
            <Table.Row>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No purchase orders have been created.
              </td>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
