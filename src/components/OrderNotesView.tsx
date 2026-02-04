import { useState } from 'react'
import { Button, FocusModal, Heading, IconButton, Table, Textarea } from '@medusajs/ui'
import { PencilSquare, Plus, Trash } from '@medusajs/icons'
import { HbOrder, HbOrderNote } from '../types'

function NoteTextView({ note }: { note: HbOrderNote }) {
  const [expanded, setExpanded] = useState(false)

  if (note.text.length <= 110 || expanded) {
    return <pre className="text-sm whitespace-pre-wrap">{note.text}</pre>
  }

  return (
    <div>
      <pre className="text-sm whitespace-pre-wrap">{note.text.slice(0, 100)}...</pre>
      <div
        className="text-sm text-blue-500 cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        show more
      </div>
    </div>
  )
}

export function OrderNotesView({ hbOrder }: { hbOrder: HbOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!hbOrder?.metadata?.finalized) return null

  const notes = hbOrder.notes || []

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">Internal Notes</Heading>
        <FocusModal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <FocusModal.Trigger asChild>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2" />
              Add Note
            </Button>
          </FocusModal.Trigger>
          <FocusModal.Content className="max-w-[600px] max-h-[430px] m-auto">
            <FocusModal.Header>
              <FocusModal.Title>Add Note</FocusModal.Title>
            </FocusModal.Header>
            <FocusModal.Body className="flex flex-col gap-y-8 p-4">
              <Textarea
                placeholder="Note"
                className="min-h-[280px] max-h-[280px] h-[280px]"
              />
            </FocusModal.Body>
            <FocusModal.Footer>
              <div className="flex items-center justify-end w-full gap-x-2">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Add Note</Button>
              </div>
            </FocusModal.Footer>
          </FocusModal.Content>
        </FocusModal>
      </div>

      <Table className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {notes.map((note) => (
            <Table.Row key={note.id}>
              <Table.Cell className="py-2">
                <NoteTextView note={note} />
              </Table.Cell>
              <Table.Cell className="min-w-[180px] w-[180px] text-xs">
                {note.created_at ? new Date(note.created_at as string).toLocaleString() : '-'}
                <br />
                {note.created_by ? `by ${note.created_by}` : null}
              </Table.Cell>
              <Table.Cell className="min-w-[180px] w-[180px] text-xs">
                {note.updated_at && note.updated_at !== note.created_at
                  ? new Date(note.updated_at as string).toLocaleString()
                  : '-'}
                <br />
                {note.updated_by ? `by ${note.updated_by}` : null}
              </Table.Cell>
              <Table.Cell>
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
          {notes.length === 0 && (
            <Table.Row>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No notes have been added to this order.
              </td>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
