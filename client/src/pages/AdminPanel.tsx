import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import { Users, Package, TrendingUp, Ban, ShieldCheck, Plus, Edit, Trash2 } from 'lucide-react'

interface User {
  id: number
  username: string
  is_admin: boolean
  is_banned: boolean
}

interface Stats {
  total_users: number
  total_products: number
  completed_deals: number
  total_revenue: number
}

interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  seller: string
  image_url?: string
}

const AdminPanel = () => {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'products'>('stats')
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Mods',
    seller: '',
    image_url: ''
  })

  useEffect(() => {
    loadStats()
    loadUsers()
    loadProducts()
  }, [])

  const loadStats = async () => {
    try {
      const { data } = await api.get<Stats>('/admin/stats')
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const { data } = await api.get<User[]>('/admin/users')
      setUsers(data)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  const loadProducts = async () => {
    try {
      const { data } = await api.get<Product[]>('/products')
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    }
  }

  const handleBanUser = async (userId: number, ban: boolean) => {
    try {
      await api.put(`/admin/users/${userId}/${ban ? 'ban' : 'unban'}`)
      loadUsers()
      alert(t('success'))
    } catch (error) {
      console.error('Failed to ban/unban user:', error)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setProductForm({ title: '', description: '', price: 0, category: 'Mods', seller: '', image_url: '' })
    setShowProductForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      seller: product.seller,
      image_url: product.image_url || ''
    })
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm(i18n.language === 'ru' ? 'Удалить товар?' : 'Delete product?')) return
    
    try {
      await api.delete(`/products/${productId}`)
      loadProducts()
      loadStats()
      alert(i18n.language === 'ru' ? 'Товар удален' : 'Product deleted')
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert(i18n.language === 'ru' ? 'Ошибка удаления' : 'Delete failed')
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productForm)
      } else {
        await api.post('/products', productForm)
      }
      loadProducts()
      loadStats()
      setShowProductForm(false)
      alert(i18n.language === 'ru' ? 'Товар сохранен' : 'Product saved')
    } catch (error) {
      console.error('Failed to save product:', error)
      alert(i18n.language === 'ru' ? 'Ошибка сохранения' : 'Save failed')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('admin_panel')}</h1>

      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === 'stats' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          {t('statistics')}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === 'products' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          {t('products')}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === 'users' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          {t('users')}
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-blue-50">
            <Users size={32} className="text-blue-600 mb-3" />
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Пользователи' : 'Users'}</p>
            <p className="text-3xl font-bold">{stats.total_users}</p>
          </div>
          <div className="card bg-green-50">
            <Package size={32} className="text-green-600 mb-3" />
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Товары' : 'Products'}</p>
            <p className="text-3xl font-bold">{stats.total_products}</p>
          </div>
          <div className="card bg-purple-50">
            <TrendingUp size={32} className="text-purple-600 mb-3" />
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Сделок' : 'Deals'}</p>
            <p className="text-3xl font-bold">{stats.completed_deals}</p>
          </div>
          <div className="card bg-yellow-50">
            <span className="text-4xl mb-3">💰</span>
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Доход' : 'Revenue'}</p>
            <p className="text-3xl font-bold">{stats.total_revenue.toFixed(0)} ₽</p>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('products')}</h2>
            <button
              onClick={handleAddProduct}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>{i18n.language === 'ru' ? 'Добавить товар' : 'Add Product'}</span>
            </button>
          </div>

          {showProductForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? (i18n.language === 'ru' ? 'Редактировать' : 'Edit') : (i18n.language === 'ru' ? 'Новый товар' : 'New Product')}
              </h3>
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <input
                  type="text"
                  placeholder={i18n.language === 'ru' ? 'Название' : 'Title'}
                  value={productForm.title}
                  onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                  className="input"
                  required
                />
                <textarea
                  placeholder={i18n.language === 'ru' ? 'Описание' : 'Description'}
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="input"
                  rows={3}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    step="0.01"
                    placeholder={i18n.language === 'ru' ? 'Цена' : 'Price'}
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder={i18n.language === 'ru' ? 'Продавец' : 'Seller'}
                    value={productForm.seller}
                    onChange={(e) => setProductForm({...productForm, seller: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <input
                  type="url"
                  placeholder={i18n.language === 'ru' ? 'URL изображения (https://...)' : 'Image URL (https://...)'}
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                  className="input"
                />
                {productForm.image_url && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">{i18n.language === 'ru' ? 'Предпросмотр:' : 'Preview:'}</p>
                    <img 
                      src={productForm.image_url} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <p className="text-sm text-red-500 mt-2 hidden">{i18n.language === 'ru' ? 'Ошибка загрузки изображения' : 'Error loading image'}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {i18n.language === 'ru' ? 'Сохранить' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setShowProductForm(false)} className="btn bg-gray-200">
                    {i18n.language === 'ru' ? 'Отмена' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="card">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">{i18n.language === 'ru' ? 'Название' : 'Title'}</th>
                  <th className="text-left px-4 py-3">{i18n.language === 'ru' ? 'Цена' : 'Price'}</th>
                  <th className="text-left px-4 py-3">{i18n.language === 'ru' ? 'Категория' : 'Category'}</th>
                  <th className="text-left px-4 py-3">{i18n.language === 'ru' ? 'Действия' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-3">{product.id}</td>
                    <td className="px-4 py-3">{product.title}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 hover:bg-blue-50 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-red-50 rounded text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">{t('username')}</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">
                    {user.is_banned ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Banned</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!user.is_admin && (
                      <button
                        onClick={() => handleBanUser(user.id, !user.is_banned)}
                        className={`px-3 py-1 rounded text-sm ${
                          user.is_banned ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'
                        }`}
                      >
                        {user.is_banned ? <ShieldCheck size={16} /> : <Ban size={16} />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
