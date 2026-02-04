import { Button, Container, Copy, Heading, Select } from '@medusajs/ui'
import { HbOrderStatus, SalesType } from '../types'
import { emptyOrder, populatedOrder } from '../data/mock'
import { NavToggle } from '../components/NavToggle'
import { CustomerView } from '../components/CustomerView'
import { ContractDatesView } from '../components/ContractDatesView'
import { NumeralValueEditor } from '../components/NumeralValueEditor'
import { MiningFacilitySelector } from '../components/MiningFacilitySelector'
import { HostingContractSelector } from '../components/HostingContractSelector'
import { AddressEditor } from '../components/AddressEditor'
import { OrderFlags } from '../components/OrderFlags'
import { LineItemsView } from '../components/LineItemsView'
import { OrderSummary } from '../components/OrderSummary'
import { CustomerOrderSummary } from '../components/CustomerOrderSummary'
import { RevenueModelView } from '../components/RevenueModelView'
import { OrderBalanceView } from '../components/OrderBalanceView'
import { ContractGenerationView } from '../components/ContractGenerationView'
import { ContractsListView } from '../components/ContractsListView'
import { FinalizeOrderView } from '../components/FinalizeOrderView'
import { OrderNotesView } from '../components/OrderNotesView'
import { OrderAdjustmentsView } from '../components/OrderAdjustmentsView'
import { InvoiceListView } from '../components/InvoiceListView'
import { POListView } from '../components/POListView'
import { FleetListView } from '../components/FleetListView'

type OrderPageProps = {
  mode: 'empty' | 'populated'
}

export function OrderPage({ mode }: OrderPageProps) {
  const hbOrder = mode === 'empty' ? emptyOrder : populatedOrder
  const isFinalized = Boolean(hbOrder?.metadata?.finalized)
  const editMode = !isFinalized

  return (
    <div className="max-w-[2100px] w-full mx-auto flex flex-col gap-y-4 px-2 py-8">
      <NavToggle />

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row gap-y-2 items-center gap-x-2">
          <Heading level="h1">{hbOrder.order_number}</Heading>
          <Copy content={hbOrder.order_number || ''} />
        </div>
      </div>

      <div className="grid grid-cols-1 min-[2000px]:grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {/* Sales Model + Status */}
          <div className="flex flex-row gap-4 justify-between">
            <div className="flex flex-row items-center gap-4">
              <Heading level="h2">Sales Model</Heading>
              <Button
                disabled={isFinalized}
                variant="secondary"
                size="small"
                className={`px-4 py-1 text-normal font-normal ${
                  hbOrder.sales_type === SalesType.BUY_HOST
                    ? 'bg-[#9999FF] hover:bg-[#9999FF] disabled:bg-[#9999FF] text-black disabled:text-black'
                    : 'text-gray-500 disabled:hidden'
                }`}
              >
                Buy & Host
              </Button>
              <Button
                disabled={isFinalized}
                variant="secondary"
                size="small"
                className={`px-4 py-1 text-normal font-normal ${
                  hbOrder.sales_type === SalesType.SEND_HOST
                    ? 'bg-[#9999FF] hover:bg-[#9999FF] disabled:bg-[#9999FF] text-black disabled:text-black'
                    : 'text-gray-500 disabled:hidden'
                }`}
              >
                Send & Host
              </Button>
              <Button
                disabled={isFinalized}
                variant="secondary"
                size="small"
                className={`px-4 py-1 text-normal font-normal ${
                  hbOrder.sales_type === SalesType.BUY_SEND
                    ? 'bg-[#9999FF] hover:bg-[#9999FF] disabled:bg-[#9999FF] text-black disabled:text-black'
                    : 'text-gray-500 disabled:hidden'
                }`}
              >
                Buy & Send
              </Button>
            </div>
            {isFinalized && (
              <div className="flex flex-row items-center gap-4">
                <Heading level="h2">Status</Heading>
                <Select value={hbOrder.status} onValueChange={() => {}}>
                  <Select.Trigger className="min-w-32 bg-white">
                    <Select.Value placeholder="Select Status" />
                  </Select.Trigger>
                  <Select.Content>
                    {Object.values(HbOrderStatus).map((status) => (
                      <Select.Item key={status} value={status}>
                        {status}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
            )}
          </div>

          {/* Customer + Contract Dates + Tax + Facility + Plan / Address + Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-4">
              <Container className="flex-1 p-4">
                <Heading level="h2" className="mb-4">
                  Customer
                </Heading>
                <CustomerView customer={hbOrder.customer} editMode={editMode} />
              </Container>

              {hbOrder.sales_type !== SalesType.BUY_SEND && (
                <ContractDatesView
                  startDate={hbOrder.start_date}
                  endDate={hbOrder.end_date}
                  editMode={editMode}
                />
              )}

              {hbOrder.sales_type !== SalesType.SEND_HOST && (
                <div className="flex flex-row gap-4">
                  <NumeralValueEditor
                    label="Tax Rate (%)"
                    value={hbOrder.metadata?.tax_rate}
                    defaultValue={10}
                    editMode={editMode}
                  />
                </div>
              )}

              {hbOrder.sales_type !== SalesType.BUY_SEND && (
                <MiningFacilitySelector
                  miningFacilityId={hbOrder?.subscription_provider_id}
                  editMode={editMode}
                />
              )}

              {hbOrder.sales_type !== SalesType.BUY_SEND && (
                <HostingContractSelector
                  contractId={hbOrder?.subscription_plan_id}
                  editMode={editMode}
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Container className="p-4">
                <AddressEditor
                  editMode={editMode}
                  title="Ship to Address"
                  address={hbOrder.shipping_address}
                />
              </Container>

              <OrderFlags hbOrder={hbOrder} />
            </div>
          </div>

          {/* Line Items */}
          <LineItemsView
            editMode={editMode}
            salesType={hbOrder.sales_type}
            lineItems={hbOrder?.line_items || []}
          />

          {/* Revenue Model */}
          <RevenueModelView hbOrder={hbOrder} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">
          <CustomerOrderSummary hbOrder={hbOrder} />

          <ContractGenerationView hbOrder={hbOrder} />

          <ContractsListView hbOrder={hbOrder} />

          <OrderSummary hbOrder={hbOrder} />

          <FinalizeOrderView hbOrder={hbOrder} />

          <OrderBalanceView hbOrder={hbOrder} />
        </div>
      </div>

      {/* Full-width sections below the grid */}
      <OrderNotesView hbOrder={hbOrder} />

      <OrderAdjustmentsView hbOrder={hbOrder} />

      <InvoiceListView hbOrder={hbOrder} />

      <POListView hbOrder={hbOrder} />

      <FleetListView hbOrder={hbOrder} />
    </div>
  )
}
