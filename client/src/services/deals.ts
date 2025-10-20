import api from './api'

export interface Deal {
  id: number
  buyer_id: number
  product_id: number
  status: 'pending' | 'accepted' | 'payment_sent' | 'completed' | 'rejected' | 'cancelled'
  created_at: string
  updated_at: string
  completed_at?: string
  product?: any
  buyer?: any
}

export interface DealMessage {
  id: number
  deal_id: number
  sender_id: number
  message: string
  is_system: boolean
  created_at: string
}

export const dealService = {
  async createDeal(productId: number): Promise<Deal> {
    const { data } = await api.post<Deal>('/deals', { product_id: productId })
    return data
  },

  async getDeals(): Promise<Deal[]> {
    const { data } = await api.get<Deal[]>('/deals')
    return data
  },

  async getDeal(id: number): Promise<Deal> {
    const { data } = await api.get<Deal>(`/deals/${id}`)
    return data
  },

  async updateDealStatus(
    id: number,
    status: string,
    steamCardCode?: string
  ): Promise<Deal> {
    const { data } = await api.put<Deal>(`/deals/${id}/status`, {
      status,
      steam_card_code: steamCardCode,
    })
    return data
  },

  async getMessages(dealId: number): Promise<DealMessage[]> {
    const { data } = await api.get<DealMessage[]>(`/deals/${dealId}/messages`)
    return data
  },

  async sendMessage(dealId: number, message: string): Promise<DealMessage> {
    const { data } = await api.post<DealMessage>(`/deals/${dealId}/messages`, { message })
    return data
  },
}
