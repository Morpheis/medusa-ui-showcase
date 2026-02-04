import { Container, Heading, Label, Switch, Tooltip } from '@medusajs/ui'
import { InformationCircle } from '@medusajs/icons'
import { HbOrder } from '../types'

export function OrderFlags({ hbOrder }: { hbOrder: HbOrder }) {
  const enableAutoInvoicing = hbOrder?.metadata?.finalized === true
    ? hbOrder?.metadata?.enable_auto_invoicing !== false
    : hbOrder?.metadata?.enable_auto_invoicing === true

  return (
    <Container className="p-4">
      <div className="flex flex-col gap-4">
        <Heading level="h3">Order Flags</Heading>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="flex flex-row items-center gap-2">
              <Label>Enable Auto Invoicing</Label>
              <Tooltip content="When enabled, new invoices will be created automatically every month">
                <InformationCircle className="w-4 h-4" />
              </Tooltip>
            </div>
            <Switch checked={enableAutoInvoicing} onCheckedChange={() => {}} />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Pipedrive Deal</Label>
            {hbOrder.metadata?.pipedrive_deal_id ? (
              <div className="flex items-center justify-between w-full px-3 py-2 border rounded-md bg-ui-bg-field text-sm shadow-borders-base">
                <span className="text-ui-fg-interactive">
                  View Deal #{hbOrder.metadata.pipedrive_deal_id}
                </span>
                <span className="text-ui-fg-muted">▼</span>
              </div>
            ) : (
              <button className="flex items-center justify-between w-full px-3 py-2 border rounded-md bg-ui-bg-field hover:bg-ui-bg-field-hover text-sm shadow-borders-base">
                <span className="text-ui-fg-muted">Link deal</span>
                <span className="ml-2 text-ui-fg-muted">▼</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
