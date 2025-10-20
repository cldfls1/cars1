import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productService, Product } from '../services/products'
import { ShoppingCart } from 'lucide-react'

const Products = () => {
  const { t, i18n } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const productsData = await productService.getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Schema.org JSON-LD for SEO */}
      {products.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.title,
                "description": product.description,
                "image": product.image_url,
                "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": product.seller
                  }
                }
              }
            }))
          })}
        </script>
      )}
      
      <div>
        {/* Products Grid */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {i18n.language === 'ru' ? 'Мод паки' : 'Mod Packs'}
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {i18n.language === 'ru' ? 'Нет доступных товаров' : 'No products available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="card hover:shadow-lg transition-all duration-200">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-primary flex items-center space-x-2"
                    >
                      <ShoppingCart size={18} />
                      <span>{t('buy_now')}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
