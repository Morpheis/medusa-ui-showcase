import { useMemo, useState } from 'react'
import { Button, Heading, Tabs } from '@medusajs/ui'
import { HbOrder, SalesType, ContractType } from '../types'

type ContractTab = {
  id: string
  label: string
  contractType: ContractType
  recipient: 'customer' | 'facility'
}

export function ContractGenerationView({ hbOrder }: { hbOrder: HbOrder }) {
  const availableTabs = useMemo<ContractTab[]>(() => {
    const tabs: ContractTab[] = []
    switch (hbOrder.sales_type) {
      case SalesType.BUY_HOST:
        tabs.push(
          { id: 'hardware', label: 'Hardware Agreement', contractType: ContractType.CUSTOMER_HARDWARE, recipient: 'customer' },
          { id: 'hosting', label: 'Hosting Agreement', contractType: ContractType.CUSTOMER_HOSTING, recipient: 'customer' },
          { id: 'facility', label: 'Facility Agreement', contractType: ContractType.FACILITY_HOSTING, recipient: 'facility' }
        )
        break
      case SalesType.SEND_HOST:
        tabs.push(
          { id: 'hosting', label: 'Hosting Agreement', contractType: ContractType.CUSTOMER_HOSTING, recipient: 'customer' },
          { id: 'facility', label: 'Facility Agreement', contractType: ContractType.FACILITY_HOSTING, recipient: 'facility' }
        )
        break
      case SalesType.BUY_SEND:
        tabs.push(
          { id: 'hardware', label: 'Hardware Agreement', contractType: ContractType.CUSTOMER_HARDWARE, recipient: 'customer' }
        )
        break
    }
    return tabs
  }, [hbOrder.sales_type])

  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || 'hosting')
  const activeRecipient = availableTabs.find((t) => t.id === activeTab)?.recipient || 'customer'

  const customerName = [
    hbOrder.customer?.first_name,
    hbOrder.customer?.last_name,
  ].filter(Boolean).join(' ')
  const customerEmail = hbOrder.customer?.email || hbOrder.customer_email
  const facilityName = hbOrder.subscription_provider?.title
  const facilityEmail = hbOrder.subscription_provider?.address?.email

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      <Heading level="h2">Contract Preview</Heading>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-3">
        <Tabs.List className="inline-block border border-gray-200 bg-gray-100">
          {availableTabs.map((tab) => (
            <Tabs.Trigger key={tab.id} value={tab.id} className="border-none rounded-none">
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="flex justify-between items-center">
          <div>
            <div className="flex flex-row gap-2 text-sm text-gray-500 mt-1">
              <span className="font-medium">Recipient:</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                {activeRecipient === 'customer' && (
                  <>
                    {customerName || 'No customer'}
                    <br />
                    {customerEmail || 'N/A'}
                  </>
                )}
                {activeRecipient === 'facility' && (
                  <>
                    {facilityName || 'No facility'}
                    <br />
                    {facilityEmail || 'N/A'}
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="flex gap-2 h-full align-top">
            <Button variant="secondary">Download PDF</Button>
            <Button variant="primary">Send Contract</Button>
          </div>
        </div>

        {availableTabs.map((tab) => (
          <Tabs.Content key={tab.id} value={tab.id}>
            <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px] border border-gray-200">
              <div className="flex justify-center">
                <div className="bg-white p-8 max-w-[700px] w-full shadow-sm rounded text-sm text-gray-600">
                  <p className="text-center text-lg font-bold mb-4">
                    {tab.label}
                  </p>
                  <p className="text-center text-gray-400 italic">
                    Contract template preview for {tab.label}.
                    <br />
                    Full contract PDF generation would occur via the backend.
                  </p>
                  <hr className="my-4" />
                  <p>
                    <strong>Order:</strong> {hbOrder.order_number}
                  </p>
                  <p>
                    <strong>Customer:</strong> {customerName || 'N/A'}
                  </p>
                  <p>
                    <strong>Facility:</strong> {facilityName || 'N/A'}
                  </p>
                  <p>
                    <strong>Units:</strong>{' '}
                    {hbOrder.line_items?.reduce((a, i) => a + i.quantity, 0) || 0}
                  </p>
                </div>
              </div>
            </div>
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  )
}
