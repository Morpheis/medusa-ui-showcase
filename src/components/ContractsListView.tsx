import { Table, Heading, Badge, Button, IconButton } from '@medusajs/ui'
import { ArrowUpRightOnBox } from '@medusajs/icons'
import { HbOrder, ContractStatus } from '../types'

export function ContractsListView({ hbOrder }: { hbOrder: HbOrder }) {
  if (!hbOrder.contracts || hbOrder.contracts.length === 0) {
    return null
  }

  const activeContracts = hbOrder.contracts.filter((c) => c.status === ContractStatus.ACTIVE)
  const voidContracts = hbOrder.contracts.filter((c) => c.status === ContractStatus.VOID)

  const getStatusColor = (status: ContractStatus): 'green' | 'grey' | 'blue' => {
    switch (status) {
      case ContractStatus.ACTIVE:
        return 'green'
      case ContractStatus.VOID:
        return 'grey'
      default:
        return 'blue'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
      <Heading level="h2" className="mb-4">
        Contracts
      </Heading>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Provider</Table.HeaderCell>
            <Table.HeaderCell>Generated At</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activeContracts.map((contract) => (
            <Table.Row key={contract.id}>
              <Table.Cell>{contract.type}</Table.Cell>
              <Table.Cell>
                <Badge color={getStatusColor(contract.status)}>{contract.status}</Badge>
              </Table.Cell>
              <Table.Cell>{contract.provider}</Table.Cell>
              <Table.Cell>
                {new Date(contract.created_at).toLocaleDateString()}{' '}
                {new Date(contract.created_at).toLocaleTimeString()}
              </Table.Cell>
              <Table.Cell>
                <Button variant="secondary" size="small">
                  View <ArrowUpRightOnBox className="ml-2" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          {voidContracts.map((contract) => (
            <Table.Row key={contract.id} className="bg-gray-50 text-gray-500">
              <Table.Cell>{contract.type}</Table.Cell>
              <Table.Cell>
                <Badge color={getStatusColor(contract.status)}>{contract.status}</Badge>
              </Table.Cell>
              <Table.Cell>{contract.provider}</Table.Cell>
              <Table.Cell>
                {new Date(contract.created_at).toLocaleDateString()}{' '}
                {new Date(contract.created_at).toLocaleTimeString()}
              </Table.Cell>
              <Table.Cell>
                <IconButton variant="transparent" size="small">
                  <ArrowUpRightOnBox />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
