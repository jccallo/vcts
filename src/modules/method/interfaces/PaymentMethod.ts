export interface PaymentMethod {
  id: number
  name: string
  description: string | null
  author_id: number
  status: string
}