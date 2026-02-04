// ── Enums ──

export enum HbOrderStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum SalesType {
  BUY_HOST = "BUY_HOST",
  SEND_HOST = "SEND_HOST",
  BUY_SEND = "BUY_SEND",
}

export enum RevenueType {
  FIXED_FEE = "FIXED_FEE",
  PROFIT_SHARE = "PROFIT_SHARE",
}

export enum ContractType {
  CUSTOMER_HARDWARE = "CUSTOMER_HARDWARE",
  CUSTOMER_HOSTING = "CUSTOMER_HOSTING",
  FACILITY_HOSTING = "FACILITY_HOSTING",
}

export enum ContractStatus {
  ACTIVE = "ACTIVE",
  VOID = "VOID",
}

export enum ContractProvider {
  BOLDSIGN = "BOLDSIGN",
}

export enum SubscriptionInterval {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  ISSUED = "ISSUED",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum HbOrderAdjustmentType {
  CHARGE = "CHARGE",
  CREDIT = "CREDIT",
  DISCOUNT = "DISCOUNT",
  PAYOUT = "PAYOUT",
}

export enum HbOrderAdjustmentDuration {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
}

export enum HbOrderAdjustmentTarget {
  CUSTOMER = "CUSTOMER",
  FACILITY = "FACILITY",
  HASHBRANCH = "HASHBRANCH",
}

export enum HbOrderLineItemType {
  PRODUCT = "PRODUCT",
}

// ── Types ──

export type HbOrderAddress = {
  first_name?: string | null
  last_name?: string | null
  company?: string | null
  address_1?: string | null
  address_2?: string | null
  city?: string | null
  country_code?: string | null
  province?: string | null
  postal_code?: string | null
  email?: string | null
  phone?: string | null
}

export type MinerCatalog = {
  id?: string
  title: string
  manufacturer: string | null
  make: string | null
  condition: string | null
  hash_rate: number | null
  efficiency: number | null
  power_consumption: number | null
  image_url: string | null
}

export type HbOrderLineItem = {
  id: string
  type: HbOrderLineItemType
  title: string
  quantity: number
  vendor_price: number
  margin_price: number
  subtotal: number
  discount: number
  tax: number
  tax_lines: any[]
  shipping: number
  total: number
  product_title: string
  product_id: string
  variant_title: string
  variant_id: string
  catalog_item_id: string
  catalog?: MinerCatalog
  hashrate: number
  efficiency: number
  power_consumption: number
  metadata?: Record<string, any>
}

export type HbOrderCalculations = {
  hardware: {
    vendors: string[]
    total_quantity: number
    total_vendor_price: number
    total_hb_margin: number
    total_discount: number
    total_shipping: number
    total_tax: number
    total: number
    total_weblist_price: number
    total_hashrate: number
    total_power_consumption_per_hour: number
    total_power_consumption_per_day: number
    total_power_consumption_per_month: number
  }
  hosting_contract: {
    interval: SubscriptionInterval
    period: number
    electricity_kwh_cost: number
  }
  hashbranch: {
    electricity_kwh_markup: number
    total_hardware_profit: number
    total_prepay: number
    total_setup_profit: number
    total_upfront_profit: number
    total_recurring_electricity_profit: number
    total_recurring_platform_profit: number
    total_recurring_profit: number
    total_contract_profit: number
  }
  mining_facility: {
    electricity_kwh_cost: number
    total_setup_cost: number
    total_prepay: number
    total_recurring_cost: number
    total_upfront_cost: number
    total_contract_cost: number
  }
  customer: {
    electricity_kwh_cost: number
    total_recurring_platform_fee: number
    total_recurring_electricity_cost: number
    total_recurring_cost: number
    total_contract_cost: number
    total_contract_hardware_cost: number
    total_contract_hosting_cost: number
    total_setup_cost: number
    total_prepay: number
    total_upfront_hardware_cost: number
    total_upfront_hosting_cost: number
    total_upfront_payment: number
  }
}

export type HostingContractMetadata = {
  vendor_deposit_interval: number
  hb_deposit_interval: number
  vendor_setup_fee_usd: number
  hb_setup_fee_usd: number
  vendor_electricity_rate_usd: number
  hb_electricity_rate_usd: number
  hb_platform_fee_usd: number
  mining_facility_management_fee_usd: number
  hb_management_fee_usd: number
  overclock_percentage: number
  power_consumption_variance_percentage: number
  minimum_up_time_percentage: number
}

export type HostingContract = {
  id: string
  title: string
  description?: string
  period: number
  interval: SubscriptionInterval
  metadata: HostingContractMetadata
}

export type MiningFacility = {
  id: string
  title: string
  location: string
  address: HbOrderAddress
}

export type HbOrderContract = {
  id: string
  type: ContractType
  status: ContractStatus
  url: string
  metadata?: Record<string, any>
  created_at: Date | string
  updated_at: Date | string
  provider: ContractProvider
}

export type HbOrderBalance = {
  contract_total: number
  adjustments_total: number
  paid_total: number
  contract_balance: number
  current_balance: number
  past_due_balance: number
  collection_total: number
  refund_total: number
  overcharge_total: number
}

export type HbOrderAdjustment = {
  id: string
  order_id: string
  type: HbOrderAdjustmentType
  duration: HbOrderAdjustmentDuration
  target: HbOrderAdjustmentTarget
  internal_title: string
  external_title: string
  description: string
  quantity: number
  unit_price: number
  subtotal: number
  is_active: boolean
  metadata: Record<string, any>
  created_by: string
  updated_by: string
  created_at: Date | string | null
  updated_at: Date | string | null
}

export type HbOrderNote = {
  id: string
  text: string
  metadata?: Record<string, unknown>
  created_at: Date | string
  updated_at?: Date | string
  created_by: string
  updated_by?: string
}

export type Invoice = {
  id: string
  invoice_number: string
  entity_id: string
  entity_type: string
  issue_date: Date | string
  due_date: Date | string
  status: keyof typeof InvoiceStatus
  amount: number
  notes?: string
  metadata: Record<string, any>
  created_at?: Date | string
  created_by?: string
  updated_at?: Date | string
}

export type PurchaseOrder = {
  id: string
  po_number: string
  status: string
  amount: number
  created_at?: Date | string
}

export type Customer = {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  company_name?: string
}

export type HbOrderMetadata = {
  finalized?: boolean
  tax_rate?: number
  shipping_rate?: number
  enable_auto_invoicing?: boolean
  pipedrive_deal_id?: number | null
  contract_params?: any
}

export type HbOrder = {
  id: string
  order_number: string
  status: HbOrderStatus
  sales_type: SalesType
  revenue_type: RevenueType

  subscription_provider_id?: string
  subscription_provider_override?: Partial<HostingContract>
  subscription_provider?: MiningFacility
  subscription_plan_id?: string
  subscription_plan_override?: Partial<HostingContract>
  subscription_plan?: HostingContract

  start_date?: Date | string
  end_date?: Date | string

  line_items?: HbOrderLineItem[]

  shipping_address?: HbOrderAddress
  billing_address?: HbOrderAddress

  metadata: HbOrderMetadata

  calculations_snapshot: HbOrderCalculations

  customer_id?: string
  customer_email?: string
  customer?: Customer

  balance?: HbOrderBalance
  adjustments?: HbOrderAdjustment[]
  notes?: HbOrderNote[]
  contracts?: HbOrderContract[]
  invoices?: Invoice[]
  purchase_orders?: PurchaseOrder[]

  created_at: Date | string
  updated_at: Date | string
}
