export interface Card {
  id: number
  number: string
  expiration_date: string
  cvv: string
  card_processor_id: number
  card_category_id: number
  bank_id: number
  customer_id: number
  author_id: number
  status: string
}
