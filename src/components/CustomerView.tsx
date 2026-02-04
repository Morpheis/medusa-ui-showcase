import { useState } from 'react'
import {
  Input,
  Button,
  FocusModal,
  Text,
  Table,
  Tabs,
  Label,
} from '@medusajs/ui'
import { Customer } from '../types'
import { mockCustomerSearchResults } from '../data/mock'

type CustomerViewProps = {
  customer?: Customer
  editMode: boolean
}

export function CustomerView({ customer, editMode }: CustomerViewProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('select')

  const filteredCustomers = searchTerm.length > 2
    ? mockCustomerSearchResults.filter(
        (c) =>
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Trigger asChild>
        <div>
          {customer ? (
            <div className="flex flex-col gap-y-1">
              <div className="flex flex-row items-center justify-start gap-x-2">
                {customer.first_name && (
                  <>
                    <Label>Name:</Label>
                    <span className="capitalize text-sm font-medium text-blue-500">
                      {customer.first_name} {customer.last_name}
                    </span>
                  </>
                )}
                {editMode && (
                  <Button variant="secondary" size="small" onClick={() => setOpen(true)}>
                    Change
                  </Button>
                )}
              </div>
              <div className="flex flex-row items-center justify-start gap-x-2">
                <Label>Email:</Label>
                <span className="text-sm font-medium text-blue-500">{customer.email}</span>
              </div>
              {customer.company_name && (
                <div className="flex flex-row items-center justify-start gap-x-2">
                  <Label>Company:</Label>
                  <span className="text-sm font-medium">{customer.company_name}</span>
                </div>
              )}
            </div>
          ) : (
            <Button variant="secondary" onClick={() => setOpen(true)} disabled={!editMode}>
              Select or Create Customer
            </Button>
          )}
        </div>
      </FocusModal.Trigger>
      <FocusModal.Content className="max-w-[800px] z-50 m-auto h-fit min-h-[500px] max-h-[90vh] overflow-y-auto">
        <FocusModal.Header>
          <FocusModal.Title>Customer Selection</FocusModal.Title>
        </FocusModal.Header>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="border-none mt-4 ml-6">
            <Tabs.Trigger value="select">Select Customer</Tabs.Trigger>
            <Tabs.Trigger value="create">Create New Customer</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="select" className="p-6">
            <div className="flex flex-col gap-y-4">
              <Input
                placeholder="Search customers by email or name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
                autoFocus
              />
              {searchTerm.length > 2 && filteredCustomers.length === 0 ? (
                <Text>No customers found. Try a different search term or create a new customer.</Text>
              ) : filteredCustomers.length > 0 ? (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Customer</Table.HeaderCell>
                      <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredCustomers.map((c) => (
                      <Table.Row key={c.id}>
                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="text-xs font-base">
                              {c.first_name} {c.last_name}
                            </span>
                            <span className="text-xs font-bold">{c.email}</span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Button variant="secondary" size="small" onClick={() => setOpen(false)}>
                            Select
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Text className="text-ui-fg-subtle">
                  Search for a customer by typing at least 3 characters
                </Text>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content value="create" className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="customer@example.com" />
              </div>
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" placeholder="First name" />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" placeholder="Last name" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Phone number" />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Company name (optional)" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary">Create Customer</Button>
            </div>
          </Tabs.Content>
        </Tabs>
      </FocusModal.Content>
    </FocusModal>
  )
}
