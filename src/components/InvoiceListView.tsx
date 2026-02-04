import { useState } from 'react'
import { Table, Badge, Heading, Copy, Button, IconButton, FocusModal, Input, Select, Text } from '@medusajs/ui'
import { Plus, Trash } from '@medusajs/icons'
import { HbOrder, InvoiceStatus } from '../types'
import { formatCurrency, formatDate, formatDateTime } from '../utils/formatters'

export function InvoiceListView({ hbOrder }: { hbOrder: HbOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!hbOrder?.metadata?.finalized) return null

  const getStatusColor = (status: keyof typeof InvoiceStatus): 'green' | 'orange' | 'blue' | 'grey' | 'red' | 'purple' => {
    switch (status) {
      case 'PAID':
        return 'green'
      case 'PARTIALLY_PAID':
        return 'orange'
      case 'ISSUED':
        return 'blue'
      case 'DRAFT':
        return 'grey'
      case 'CANCELLED':
        return 'red'
      case 'REFUNDED':
        return 'purple'
      default:
        return 'grey'
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <Heading level="h2">Invoices</Heading>
        <FocusModal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <FocusModal.Trigger asChild>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2" />
              Create Invoice
            </Button>
          </FocusModal.Trigger>
          <FocusModal.Content className="max-w-md h-fit m-auto">
            <FocusModal.Header>
              <FocusModal.Title>Create Invoice</FocusModal.Title>
            </FocusModal.Header>
            <FocusModal.Body className="flex flex-col gap-y-4 p-4">
              <div>
                <Text className="font-medium mb-1">Issue Date</Text>
                <Input type="date" />
              </div>
              <div>
                <Text className="font-medium mb-1">Due Date</Text>
                <Input type="date" />
              </div>
              <div>
                <Text className="font-medium mb-1">Status</Text>
                <Select value="DRAFT" onValueChange={() => {}}>
                  <Select.Trigger>
                    <Select.Value placeholder="Select status" />
                  </Select.Trigger>
                  <Select.Content>
                    {Object.keys(InvoiceStatus).map((key) => (
                      <Select.Item key={key} value={key}>
                        {key}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Text className="font-medium mb-1">Notes</Text>
                <Input placeholder="Invoice notes" />
              </div>
            </FocusModal.Body>
            <FocusModal.Footer>
              <div className="flex items-center justify-end w-full gap-x-2">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Create Invoice</Button>
              </div>
            </FocusModal.Footer>
          </FocusModal.Content>
        </FocusModal>
      </div>

      <Table className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Invoice #</Table.HeaderCell>
            <Table.HeaderCell>Issue Date</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {hbOrder?.invoices?.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-x-2">
                    {invoice.invoice_number}
                    <Copy content={invoice.invoice_number} />
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {(invoice.metadata?.hb_order_invoice_type as string)?.replace('_', ' ').toLowerCase() || ''}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{formatDate(invoice.issue_date)}</Table.Cell>
              <Table.Cell>{formatDate(invoice.due_date)}</Table.Cell>
              <Table.Cell>
                <b>{formatCurrency(invoice.amount)}</b>
              </Table.Cell>
              <Table.Cell>
                <Badge color={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </Table.Cell>
              <Table.Cell className="w-[180px] text-xs">
                {invoice.created_at ? formatDateTime(invoice.created_at) : '-'}
                <br />
                {invoice.created_by ? `by ${invoice.created_by}` : null}
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-x-2">
                  <Button variant="secondary" size="small">
                    Preview
                  </Button>
                  {invoice.status === 'DRAFT' && (
                    <Button variant="secondary" size="small">
                      Edit
                    </Button>
                  )}
                  {(invoice.status === 'DRAFT' || invoice.status === 'ISSUED') && (
                    <IconButton variant="transparent" size="small">
                      <Trash />
                    </IconButton>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {(!hbOrder.invoices || hbOrder.invoices.length === 0) && (
            <Table.Row>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No invoices have been created for this order.
              </td>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
