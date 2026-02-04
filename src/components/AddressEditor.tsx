import { Heading, Input, Label, Text, Select } from '@medusajs/ui'
import { HbOrderAddress } from '../types'

type AddressEditorProps = {
  title?: string
  address?: HbOrderAddress | null
  editMode: boolean
}

export function AddressEditor({ title = 'Address', address, editMode }: AddressEditorProps) {
  if (!editMode) {
    if (!address) {
      return (
        <div className="flex items-center justify-center h-full">
          <Text className="text-ui-fg-subtle">No address information available</Text>
        </div>
      )
    }

    return (
      <div className="space-y-1">
        <Heading level="h2" className="font-medium mb-2">{title}</Heading>
        <div className="grid grid-cols-1 gap-y-2 text-base">
          <div className="grid grid-cols-2 gap-2">
            {(address?.first_name || address?.last_name) && (
              <div>
                <Label className="text-xs">Name</Label>
                <Text className="font-medium">
                  {[address?.first_name, address?.last_name].filter(Boolean).join(' ')}
                </Text>
              </div>
            )}
            {address?.company && (
              <div>
                <Label className="text-xs">Company</Label>
                <Text className="font-medium">{address.company}</Text>
              </div>
            )}
          </div>
          {address?.address_1 && (
            <div>
              <Label className="text-xs">Street Address:</Label>
              <Text className="font-medium">{address.address_1}</Text>
            </div>
          )}
          {address?.address_2 && (
            <div>
              <Label className="text-xs">Apt/Suite/Unit:</Label>
              <Text className="font-medium">{address.address_2}</Text>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            {address?.city && (
              <div>
                <Label className="text-xs">City:</Label>
                <Text className="font-medium">{address.city}</Text>
              </div>
            )}
            {address?.province && (
              <div>
                <Label className="text-xs">Province:</Label>
                <Text className="font-medium">{address.province}</Text>
              </div>
            )}
            {address?.postal_code && (
              <div>
                <Label className="text-xs">Postal Code:</Label>
                <Text className="font-medium">{address.postal_code}</Text>
              </div>
            )}
          </div>
          {address?.country_code && (
            <div>
              <Label className="text-xs">Country:</Label>
              <Text className="font-medium">{address.country_code.toUpperCase()}</Text>
            </div>
          )}
          {address?.email && (
            <div>
              <Label className="text-xs">Email:</Label>
              <Text className="font-medium">{address.email}</Text>
            </div>
          )}
          {address?.phone && (
            <div>
              <Label className="text-xs">Phone:</Label>
              <Text className="font-medium">{address.phone}</Text>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Edit mode
  return (
    <div className="space-y-2">
      <Heading level="h3" className="font-semibold mb-2">{title}</Heading>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" className="mt-1" defaultValue={address?.first_name || ''} />
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" className="mt-1" defaultValue={address?.last_name || ''} />
        </div>
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" className="mt-1" defaultValue={address?.company || ''} />
      </div>
      <div>
        <Label htmlFor="address_1">Address</Label>
        <Input id="address_1" className="mt-1" defaultValue={address?.address_1 || ''} />
      </div>
      <div>
        <Label htmlFor="address_2">Apartment, suite, etc.</Label>
        <Input id="address_2" className="mt-1" defaultValue={address?.address_2 || ''} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" className="mt-1" defaultValue={address?.city || ''} />
        </div>
        <div>
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input id="postal_code" className="mt-1" defaultValue={address?.postal_code || ''} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="province">Province/State</Label>
          <Input id="province" className="mt-1" defaultValue={address?.province || ''} />
        </div>
        <div>
          <Label htmlFor="country_code">Country</Label>
          <Select value={address?.country_code || 'US'} onValueChange={() => {}}>
            <Select.Trigger className="mt-1">
              <Select.Value placeholder="Select a country" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="US">United States (USA)</Select.Item>
              <Select.Item value="CA">Canada</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" className="mt-1" defaultValue={address?.email || ''} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" className="mt-1" defaultValue={address?.phone || ''} />
        </div>
      </div>
    </div>
  )
}
