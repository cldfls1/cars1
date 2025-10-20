import api from './api'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  seller: string
  image_url?: string
  created_at: string
}

export const productService = {
  async getCategories(): Promise<string[]> {
    const { data } = await api.get<string[]>('/categories')
    return data
  },

  async getProducts(category?: string, search?: string): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products', {
      params: { category, search },
    })
    return data
  },

  async getProduct(id: number): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },
}
