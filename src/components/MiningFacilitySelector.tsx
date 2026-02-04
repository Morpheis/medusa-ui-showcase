import { Container, Heading, Text, Select } from '@medusajs/ui'
import { mockMiningFacilities } from '../data/mock'

type MiningFacilitySelectorProps = {
  miningFacilityId?: string
  editMode: boolean
}

export function MiningFacilitySelector({ miningFacilityId, editMode }: MiningFacilitySelectorProps) {
  if (!editMode) {
    const mf = mockMiningFacilities.find((f) => f.id === miningFacilityId)
    return (
      <Container className="p-4">
        <Heading level="h2" className="mb-4">Mining Facility</Heading>
        <Text>{mf?.label || miningFacilityId || 'Not selected'}</Text>
      </Container>
    )
  }

  return (
    <Container className="p-4">
      <Heading level="h2" className="mb-4">Mining Facility</Heading>
      <Select value={miningFacilityId || ''} onValueChange={() => {}}>
        <Select.Trigger>
          <Select.Value placeholder="Select a mining facility" />
        </Select.Trigger>
        <Select.Content>
          {mockMiningFacilities.map((mf) => (
            <Select.Item key={mf.id} value={mf.id}>
              {mf.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Container>
  )
}
