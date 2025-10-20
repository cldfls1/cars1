import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productService, Product } from '../services/products'
import { dealService } from '../services/deals'
import { useAuthStore } from '../store/authStore'
import { formatPrice } from '../lib/utils'
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    if (id) {
      loadProduct()
    }
  }, [id, i18n.language])

  const loadProduct = async () => {
    try {
      const data = await productService.getProduct(parseInt(id!), i18n.language)
      setProduct(data)
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setPurchasing(true)
    try {
      const deal = await dealService.createDeal(parseInt(id!))
      navigate(`/deals/${deal.id}`)
    } catch (error) {
      console.error('Failed to create deal:', error)
      alert(i18n.language === 'ru' ? 'Не удалось создать сделку' : 'Failed to create deal')
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">
          {i18n.language === 'ru' ? 'Товар не найден' : 'Product not found'}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition mb-8"
      >
        <ArrowLeft size={20} />
        <span>{i18n.language === 'ru' ? 'Назад к товарам' : 'Back to products'}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full rounded-2xl shadow-lg"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
              <Package size={64} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="mb-6">
            <span className="text-5xl font-bold text-primary-600">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-600">
                {i18n.language === 'ru' ? 'Наличие:' : 'Stock:'}
              </span>
              <span className="font-medium text-green-600">
                {i18n.language === 'ru' ? 'В наличии' : 'In Stock'}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-600">
                {i18n.language === 'ru' ? 'Доставка:' : 'Delivery:'}
              </span>
              <span className="font-medium">
                {i18n.language === 'ru' ? 'Мгновенная' : 'Instant'}
              </span>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={purchasing}
            className="btn btn-primary w-full text-xl py-4 flex items-center justify-center space-x-3"
          >
            <ShoppingCart size={24} />
            <span>
              {purchasing 
                ? t('loading')
                : (i18n.language === 'ru' ? 'Купить сейчас' : 'Buy Now')}
            </span>
          </button>

          {!isAuthenticated && (
            <p className="mt-4 text-sm text-gray-600 text-center">
              {i18n.language === 'ru' 
                ? 'Войдите, чтобы совершить покупку'
                : 'Sign in to make a purchase'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
