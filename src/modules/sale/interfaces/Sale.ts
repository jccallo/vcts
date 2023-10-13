export interface Sale {
  id: number
  installments: string | null
  interest_free: string | null
  amount: string | null
  authorization: string | null
  observation: string | null
  sale_customer_code: string | null
  sales_date: string | null
  document_number: string | null
  sales_month: string | null
  sales_year: string | null
  activation_date: string | null
  payment_method_id: number | null
  retailer_id: number | null
  certificate_id: number | null
  courtesy_id: number | null
  activation_id: number | null
  situation_id: number | null
  document_id: number | null
  card_id: number | null
  beneficiary_id: number | null
  branch_id: number
  customer_id: number
  author_id: number
  status: string
}