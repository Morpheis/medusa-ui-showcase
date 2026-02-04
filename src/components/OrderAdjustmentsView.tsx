import { useState } from 'react'
import { Button, FocusModal, Heading, IconButton, Input, Select, Switch, Label, Table, Text } from '@medusajs/ui'
import { InformationCircle, PencilSquare, Plus, Trash } from '@medusajs/icons'
import { Tooltip } from '@medusajs/ui'
import { HbOrder, HbOrderAdjustmentType, HbOrderAdjustmentDuration, HbOrderAdjustmentTarget } from '../types'
import { formatCurrency } from '../utils/formatters'

export function OrderAdjustmentsView({ hbOrder }: { hbOrder: HbOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!hbOrder?.metadata?.finalized) return null

  const adjustments = hbOrder.adjustments || []

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">Adjustments</Heading>
        <FocusModal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <FocusModal.Trigger asChild>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2" />
              Add Adjustment
            </Button>
          </FocusModal.Trigger>
          <FocusModal.Content className="max-w-sm h-fit m-auto">
            <FocusModal.Header>
              <FocusModal.Title>Add Adjustment</FocusModal.Title>
            </FocusModal.Header>
            <FocusModal.Body className="flex flex-col gap-y-4 p-4">
              <div>
                <Text className="font-medium mb-1">Type</Text>
                <Select value="CHARGE" onValueChange={() => {}}>
                  <Select.Trigger>
                    <Select.Value placeholder="Select type" />
                  </Select.Trigger>
                  <Select.Content>
                    {Object.keys(HbOrderAdjustmentType).map((key) => (
                      <Select.Item key={key} value={key}>
                        {key}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Text className="font-medium mb-1">Duration</Text>
                <Select value="ONE_TIME" onValueChange={() => {}}>
                  <Select.Trigger>
                    <Select.Value placeholder="Select duration" />
                  </Select.Trigger>
                  <Select.Content>
                    {Object.keys(HbOrderAdjustmentDuration).map((key) => (
                      <Select.Item key={key} value={key}>
                        {key.replace('_', ' ')}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Text className="font-medium mb-1">Target</Text>
                <Select value="CUSTOMER" onValueChange={() => {}}>
                  <Select.Trigger>
                    <Select.Value placeholder="Select target" />
                  </Select.Trigger>
                  <Select.Content>
                    {Object.keys(HbOrderAdjustmentTarget).map((key) => (
                      <Select.Item key={key} value={key}>
                        {key}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Text className="font-medium mb-1">Title</Text>
                <Input placeholder="Title" />
              </div>
              <div>
                <Text className="font-medium mb-1">Description</Text>
                <Input placeholder="Description" />
              </div>
              <div>
                <Text className="font-medium mb-1">Unit Price</Text>
                <Input placeholder="0.00" type="number" />
              </div>
              <div>
                <Text className="font-medium mb-1">Quantity</Text>
                <Input type="number" defaultValue="1" min={1} />
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <Label htmlFor="is_active" className="font-medium">Active</Label>
                <Switch id="is_active" checked={true} onCheckedChange={() => {}} />
              </div>
            </FocusModal.Body>
            <FocusModal.Footer>
              <div className="flex items-center justify-end w-full gap-x-2">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Add Adjustment</Button>
              </div>
            </FocusModal.Footer>
          </FocusModal.Content>
        </FocusModal>
      </div>

      <Table className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Target</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {adjustments.map((adj) => (
            <Table.Row key={adj.id}>
              <Table.Cell className="text-xs capitalize">
                {adj.duration?.replace('_', ' ').toLowerCase() || 'one time'}
              </Table.Cell>
              <Table.Cell className="text-xs capitalize">{adj.type.toLowerCase()}</Table.Cell>
              <Table.Cell className="text-xs capitalize">{adj.target.toLowerCase()}</Table.Cell>
              <Table.Cell className="text-xs">
                <div className="flex flex-row items-center gap-x-2 w-full">
                  <Text className="text-xs font-medium">{adj.external_title}</Text>
                  {adj.internal_title && (
                    <Tooltip content={`QuickBooks Line Item: ${adj.internal_title}`}>
                      <InformationCircle className="w-4 h-4" />
                    </Tooltip>
                  )}
                </div>
                {adj.external_title !== adj.description && (
                  <Text className="text-xs">{adj.description}</Text>
                )}
              </Table.Cell>
              <Table.Cell className="text-xs">{formatCurrency(adj.subtotal)}</Table.Cell>
              <Table.Cell className="text-xs">{adj.is_active ? 'Active' : 'Inactive'}</Table.Cell>
              <Table.Cell className="w-[180px] text-xs">
                {adj.created_at ? new Date(adj.created_at as string).toLocaleString() : '-'}
                <br />
                {adj.created_by ? `by ${adj.created_by}` : null}
              </Table.Cell>
              <Table.Cell className="w-[180px] text-xs">
                {adj.updated_at && adj.updated_at !== adj.created_at
                  ? new Date(adj.updated_at as string).toLocaleString()
                  : '-'}
                <br />
                {adj.updated_by ? `by ${adj.updated_by}` : null}
              </Table.Cell>
              <Table.Cell className="text-xs">
                <div className="flex items-center gap-x-2">
                  <IconButton variant="transparent">
                    <PencilSquare />
                  </IconButton>
                  <IconButton variant="transparent">
                    <Trash />
                  </IconButton>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {adjustments.length === 0 && (
            <Table.Row>
              <td colSpan={9} className="text-center py-4 text-gray-500">
                No adjustments have been added to this order.
              </td>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
