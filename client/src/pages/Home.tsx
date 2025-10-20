import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productService, Product } from '../services/products'
import { 
  Package, 
  ArrowRight, 
  Shield, 
  Zap, 
  Star,
  CheckCircle,
  MessageSquare,
  Lock,
  ShoppingCart
} from 'lucide-react'

const Home = () => {
  const { i18n } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-32 fade-in max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-6">
            {i18n.language === 'ru' ? 'CarX Street' : 'CarX Street'}
          </span>
        </div>
        <h1 className="text-7xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight leading-none">
          Premium CarX Street Mods
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          {i18n.language === 'ru' 
            ? 'Профессиональные моды для CarX Street. Купить моды на машины, карты, ливреи. Безопасные сделки с гарантией качества и мгновенной доставкой.'
            : 'Professional mods for CarX Street. Buy car mods, maps, liveries, sound packs. Secure deals with quality guarantee and instant delivery.'}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap mb-20">
          <Link to="/products" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all">
            <span>{i18n.language === 'ru' ? 'КАТАЛОГ' : 'BROWSE'}</span>
            <ArrowRight className="ml-2" size={16} />
          </Link>
          <Link to="/register" className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-900 text-sm font-medium hover:border-gray-900 transition-all">
            <span>{i18n.language === 'ru' ? 'РЕГИСТРАЦИЯ' : 'SIGN UP'}</span>
          </Link>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-12 pt-12 border-t border-gray-200">
          <div>
            <p className="text-4xl font-bold text-gray-900 mb-2">500+</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">{i18n.language === 'ru' ? 'Клиентов' : 'Clients'}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900 mb-2">1000+</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">{i18n.language === 'ru' ? 'Загрузок' : 'Downloads'}</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900 mb-2">4.9</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">{i18n.language === 'ru' ? 'Рейтинг' : 'Rating'}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mb-32">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            {i18n.language === 'ru' ? 'Популярные моды' : 'Popular Mods'}
          </h2>
          <p className="text-lg text-gray-500">
            {i18n.language === 'ru' 
              ? 'Лучшие моды для CarX Street'
              : 'Best mods for CarX Street'}
          </p>
        </div>
        
        {loading ? (
          <div className="py-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {i18n.language === 'ru' ? 'Нет доступных товаров' : 'No products available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 overflow-hidden"
              >
                {product.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:underline">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <ShoppingCart size={16} className="mr-1" />
                      <span>{i18n.language === 'ru' ? 'Купить' : 'Buy'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/products" className="inline-flex items-center px-8 py-4 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all">
            <span>{i18n.language === 'ru' ? 'ПОСМОТРЕТЬ ВСЕ' : 'VIEW ALL'}</span>
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mb-32 py-20 border-t border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {/* Security */}
          <div className="group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors">
              <Shield size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Безопасность' : 'Security'}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {i18n.language === 'ru' 
                ? 'Защита покупателя на каждом этапе сделки. Возврат средств при проблемах.'
                : 'Buyer protection at every step. Money-back guarantee if issues arise.'}
            </p>
            <div className="h-px w-12 bg-gray-900"></div>
          </div>

          {/* Speed */}
          <div className="group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors">
              <Zap size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Скорость' : 'Speed'}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {i18n.language === 'ru' 
                ? 'Мгновенная доставка после подтверждения платежа. Получите моды за минуты.'
                : 'Instant delivery after payment confirmation. Get your mods in minutes.'}
            </p>
            <div className="h-px w-12 bg-gray-900"></div>
          </div>

          {/* Quality */}
          <div className="group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors">
              <Star size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Качество' : 'Quality'}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {i18n.language === 'ru' 
                ? 'Только проверенные моды от надежных авторов. Гарантия работоспособности.'
                : 'Only verified mods from trusted authors. Performance guaranteed.'}
            </p>
            <div className="h-px w-12 bg-gray-900"></div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-32">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            {i18n.language === 'ru' ? 'Как это работает' : 'How It Works'}
          </h2>
          <p className="text-lg text-gray-500">
            {i18n.language === 'ru' 
              ? 'Простой процесс покупки в 4 шага'
              : 'Simple purchase process in 4 steps'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200">
          <div className="bg-white p-10 group hover:bg-gray-50 transition-colors">
            <div className="mb-8">
              <span className="text-6xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">01</span>
            </div>
            <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
              <Package size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Выберите' : 'Choose'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Найдите нужный пак модов в каталоге' : 'Find the mod pack you need in catalog'}
            </p>
          </div>

          <div className="bg-white p-10 group hover:bg-gray-50 transition-colors">
            <div className="mb-8">
              <span className="text-6xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">02</span>
            </div>
            <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
              <MessageSquare size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Оформите' : 'Order'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Создайте сделку и свяжитесь с продавцом' : 'Create deal and contact seller'}
            </p>
          </div>

          <div className="bg-white p-10 group hover:bg-gray-50 transition-colors">
            <div className="mb-8">
              <span className="text-6xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">03</span>
            </div>
            <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
              <Lock size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Оплатите' : 'Pay'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Отправьте Steam Gift Card код' : 'Send Steam Gift Card code'}
            </p>
          </div>

          <div className="bg-white p-10 group hover:bg-gray-50 transition-colors">
            <div className="mb-8">
              <span className="text-6xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">04</span>
            </div>
            <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
              <CheckCircle size={24} className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Получите' : 'Receive'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Скачайте моды сразу после проверки' : 'Download mods right after verification'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 p-20 text-center text-white">
        <h2 className="text-5xl font-bold mb-6">
          {i18n.language === 'ru' ? 'Готовы начать?' : 'Ready to Start?'}
        </h2>
        <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
          {i18n.language === 'ru' 
            ? 'Присоединяйтесь к сообществу и получите лучшие моды для CarX'
            : 'Join the community and get the best mods for CarX'}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/products" className="bg-white text-gray-900 px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-all inline-flex items-center">
            <span>{i18n.language === 'ru' ? 'КАТАЛОГ' : 'BROWSE MODS'}</span>
            <ArrowRight className="ml-2" size={16} />
          </Link>
          <Link to="/register" className="border border-white text-white px-8 py-4 text-sm font-medium hover:bg-white hover:text-gray-900 transition-all inline-flex items-center">
            <span>{i18n.language === 'ru' ? 'РЕГИСТРАЦИЯ' : 'SIGN UP'}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
