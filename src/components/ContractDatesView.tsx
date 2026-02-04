import { Container, Heading, Text, Input } from '@medusajs/ui'
import { formatDateUTC } from '../utils/formatters'

type ContractDatesViewProps = {
  startDate?: Date | string
  endDate?: Date | string
  editMode: boolean
}

export function ContractDatesView({ startDate, endDate, editMode }: ContractDatesViewProps) {
  if (!editMode) {
    return (
      <Container className="p-4">
        <Heading level="h2" className="mb-4">Contract Dates</Heading>
        <Text>Start Date: {startDate ? formatDateUTC(startDate) : 'N/A'}</Text>
        <Text>End Date: {endDate ? formatDateUTC(endDate) : 'N/A'}</Text>
      </Container>
    )
  }

  const startVal = startDate
    ? new Date(startDate).toISOString().split('T')[0]
    : ''

  return (
    <Container className="p-4">
      <Heading level="h2" className="mb-4">Contract Dates</Heading>
      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-1">
          <Text>Start Date</Text>
          <Input type="date" defaultValue={startVal} />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Text>End Date</Text>
          <div className="text-base text-gray-500 leading-[32px]">
            {endDate ? formatDateUTC(endDate) : 'N/A'}
          </div>
        </div>
      </div>
    </Container>
  )
}
