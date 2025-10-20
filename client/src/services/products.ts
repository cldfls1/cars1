import api from './api'

export interface Category {
  id: number
  name: string
  description: string
  icon?: string
  created_at: string
}

export interface Product {
  id: number
  category_id: number
  title: string
  description: string
  price: number
  currency: string
  image_url?: string
  is_active: boolean
  stock_quantity: number
  created_at: string
  updated_at: string
}

export const productService = {
  async getCategories(lang: string = 'ru'): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/categories', { params: { lang } })
    return data
  },

  async getProducts(categoryId?: number, lang: string = 'ru'): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products', {
      params: { category_id: categoryId, lang },
    })
    return data
  },

  async getProduct(id: number, lang: string = 'ru'): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`, { params: { lang } })
    return data
  },
}
