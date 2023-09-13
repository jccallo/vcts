export interface Sale {
  branch_id: number | null
  profile_id: number | null
  customer_id: number | null
  card_id: number | null
  beneficiary_id: number | null
  payment_method: string | null
  interest_free: string | null
  installments: string | null
  courtesy: string | null
  retailer: string | null
  certificates: string | null
  amount: string | number | null
  authorization: string | null
  observation: string
}