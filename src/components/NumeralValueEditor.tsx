import { Container, Heading, Text, Input } from '@medusajs/ui'

type NumeralValueEditorProps = {
  label: string
  value?: number
  defaultValue?: number
  editMode: boolean
}

export function NumeralValueEditor({
  label,
  value,
  defaultValue = 0,
  editMode,
}: NumeralValueEditorProps) {
  if (!editMode) {
    return (
      <Container className="p-4">
        <Heading level="h2" className="mb-4">{label}</Heading>
        <Text>{value === null || value === undefined ? 'No value set' : `${value}%`}</Text>
      </Container>
    )
  }

  return (
    <Container className="p-4">
      <Heading level="h2" className="mb-4">{label}</Heading>
      <div className="flex flex-col gap-4">
        <Input type="text" defaultValue={(value ?? defaultValue).toString()} />
      </div>
    </Container>
  )
}
