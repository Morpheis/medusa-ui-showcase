import { Container, Heading, Text, Select } from '@medusajs/ui'
import { mockHostingPlans } from '../data/mock'

type HostingContractSelectorProps = {
  contractId?: string
  editMode: boolean
}

export function HostingContractSelector({ contractId, editMode }: HostingContractSelectorProps) {
  if (!editMode) {
    const plan = mockHostingPlans.find((p) => p.id === contractId)
    return (
      <Container className="p-4">
        <Heading level="h2" className="mb-4">Hosting Plan</Heading>
        <Text>{plan?.label || contractId || 'Not selected'}</Text>
      </Container>
    )
  }

  return (
    <Container className="p-4">
      <Heading level="h2" className="mb-4">Hosting Plan</Heading>
      <Select value={contractId || ''} onValueChange={() => {}}>
        <Select.Trigger>
          <Select.Value placeholder="Select a hosting plan" />
        </Select.Trigger>
        <Select.Content>
          {mockHostingPlans.map((plan) => (
            <Select.Item key={plan.id} value={plan.id}>
              {plan.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Container>
  )
}
