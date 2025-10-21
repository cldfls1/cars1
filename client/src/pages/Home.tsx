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
  ShoppingCart,
  ShoppingBag
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
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 md:mb-32 fade-in max-w-5xl mx-auto relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gray-200 rounded-full blur-2xl opacity-20 -z-10"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-200 rounded-full blur-2xl opacity-20 -z-10"></div>
        
        <div className="mb-4 md:mb-6 inline-block">
          <span className="inline-flex items-center text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 md:mb-6 relative px-6 py-2 border border-gray-300 bg-white shadow-sm">
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></span>
              {i18n.language === 'ru' ? 'CarX Street' : 'CarX Street'}
              <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></span>
            </span>
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 md:mb-8 tracking-tighter leading-tight md:leading-none px-4 relative">
          <span className="relative inline-block text-shadow">
            Premium CarX 
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">Street Mods</span>
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          {i18n.language === 'ru' 
            ? 'Профессиональные моды для CarX Street. Купить моды на машины, карты, ливреи. Безопасные сделки с гарантией качества и мгновенной доставкой.'
            : 'Professional mods for CarX Street. Buy car mods, maps, liveries, sound packs. Secure deals with quality guarantee and instant delivery.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 flex-wrap mb-12 md:mb-20 px-4">
          <Link to="/products" className="group w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
            <span>{i18n.language === 'ru' ? 'КАТАЛОГ' : 'BROWSE'}</span>
            <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
          <Link to="/register" className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 text-gray-900 text-sm font-medium hover:border-gray-900 hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
            <span>{i18n.language === 'ru' ? 'РЕГИСТРАЦИЯ' : 'SIGN UP'}</span>
          </Link>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 pt-8 md:pt-12 border-t-2 border-gray-200">
          <div className="group transition-all hover:scale-110 cursor-pointer">
            <p className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-gray-700 transition-colors group-hover:animate-pulse">500+</p>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">{i18n.language === 'ru' ? 'Клиентов' : 'Clients'}</p>
          </div>
          <div className="group transition-all hover:scale-110 border-x-2 border-gray-200 px-2 cursor-pointer">
            <p className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-gray-700 transition-colors group-hover:animate-pulse">1000+</p>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">{i18n.language === 'ru' ? 'Загрузок' : 'Downloads'}</p>
          </div>
          <div className="group transition-all hover:scale-110 cursor-pointer">
            <p className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-gray-700 transition-colors group-hover:animate-pulse">4.9</p>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">{i18n.language === 'ru' ? 'Рейтинг' : 'Rating'}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mb-16 md:mb-32">
        <div className="mb-8 md:mb-16 text-center relative">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 relative z-10">
              {i18n.language === 'ru' ? 'Мод паки' : 'Mod Packs'}
            </h2>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gray-900"></div>
          </div>
          <p className="text-base md:text-lg text-gray-500 mt-6">
            {i18n.language === 'ru' 
              ? 'Готовые пакеты модов для CarX Street'
              : 'Ready-made mod packs for CarX Street'}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 relative scale-in hover-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {product.image_url && (
                  <div className="aspect-video overflow-hidden bg-gray-100 relative">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {i18n.language === 'ru' ? 'Новое' : 'New'}
                    </div>
                  </div>
                )}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xl md:text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <div className="flex items-center text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                      <ShoppingCart size={16} className="mr-1.5 group-hover:scale-110 transition-transform" />
                      <span>{i18n.language === 'ru' ? 'Купить' : 'Buy'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8 md:mt-12">
          <Link to="/products" className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 border-2 border-gray-900 text-gray-900 text-sm font-bold hover:bg-gray-900 hover:text-white transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1">
            <span>{i18n.language === 'ru' ? 'ПОСМОТРЕТЬ ВСЕ' : 'VIEW ALL'}</span>
            <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mb-16 md:mb-32 py-12 md:py-20 border-t-2 border-b-2 border-gray-200 bg-gray-50 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-6xl mx-auto">
          {/* Security */}
          <div className="group relative p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-glow overflow-hidden">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110">
              <Shield size={26} className="text-gray-900 group-hover:text-white transition-all duration-300 group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Безопасность' : 'Security'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
              {i18n.language === 'ru' 
                ? 'Защита покупателя на каждом этапе сделки. Возврат средств при проблемах.'
                : 'Buyer protection at every step. Money-back guarantee if issues arise.'}
            </p>
            <div className="h-0.5 w-16 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
          </div>

          {/* Speed */}
          <div className="group relative p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-glow overflow-hidden">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110">
              <Zap size={26} className="text-gray-900 group-hover:text-white transition-all duration-300 group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Скорость' : 'Speed'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
              {i18n.language === 'ru' 
                ? 'Мгновенная доставка после подтверждения платежа. Получите моды за минуты.'
                : 'Instant delivery after payment confirmation. Get your mods in minutes.'}
            </p>
            <div className="h-0.5 w-16 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
          </div>

          {/* Quality */}
          <div className="group relative p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-glow overflow-hidden">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-12">
              <Star size={26} className="text-gray-900 group-hover:text-white transition-all duration-300 group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Качество' : 'Quality'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
              {i18n.language === 'ru' 
                ? 'Только проверенные моды от надежных авторов. Гарантия работоспособности.'
                : 'Only verified mods from trusted authors. Performance guaranteed.'}
            </p>
            <div className="h-0.5 w-16 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16 md:mb-32">
        <div className="mb-8 md:mb-16 text-center relative">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 relative z-10">
              {i18n.language === 'ru' ? 'Как это работает' : 'How It Works'}
            </h2>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gray-900"></div>
          </div>
          <p className="text-base md:text-lg text-gray-500 mt-6">
            {i18n.language === 'ru' 
              ? 'Простой процесс покупки в 4 шага'
              : 'Simple purchase process in 4 steps'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 md:p-10 group hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
            <div className="mb-6 md:mb-8 relative">
              <span className="text-4xl md:text-6xl font-bold text-gray-200 group-hover:text-gray-400 transition-colors group-hover:scale-110 inline-block transform duration-300">01</span>
            </div>
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <Package size={24} className="text-gray-900 group-hover:text-white transition-colors group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Выберите' : 'Choose'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Найдите нужный пак модов в каталоге' : 'Find the mod pack you need in catalog'}
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 group hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
            <div className="mb-6 md:mb-8 relative">
              <span className="text-4xl md:text-6xl font-bold text-gray-200 group-hover:text-gray-400 transition-colors group-hover:scale-110 inline-block transform duration-300">02</span>
            </div>
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <MessageSquare size={24} className="text-gray-900 group-hover:text-white transition-colors group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Оформите' : 'Order'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Создайте сделку и свяжитесь с продавцом' : 'Create deal and contact seller'}
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 group hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
            <div className="mb-6 md:mb-8 relative">
              <span className="text-4xl md:text-6xl font-bold text-gray-200 group-hover:text-gray-400 transition-colors group-hover:scale-110 inline-block transform duration-300">03</span>
            </div>
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <Lock size={24} className="text-gray-900 group-hover:text-white transition-colors group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Оплатите' : 'Pay'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Отправьте Steam Gift Card код' : 'Send Steam Gift Card code'}
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 group hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
            <div className="mb-6 md:mb-8 relative">
              <span className="text-4xl md:text-6xl font-bold text-gray-200 group-hover:text-gray-400 transition-colors group-hover:scale-110 inline-block transform duration-300">04</span>
            </div>
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <CheckCircle size={24} className="text-gray-900 group-hover:text-white transition-colors group-hover:animate-pulse" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 uppercase tracking-wide text-gray-900">
              {i18n.language === 'ru' ? 'Получите' : 'Receive'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {i18n.language === 'ru' ? 'Скачайте моды сразу после проверки' : 'Download mods right after verification'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            {i18n.language === 'ru' ? 'Готовы начать?' : 'Ready to Start?'}
          </h2>
          <p className="text-base md:text-xl mb-8 md:mb-12 text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
            {i18n.language === 'ru' 
              ? 'Присоединяйтесь к сообществу и получите лучшие моды для CarX'
              : 'Join the community and get the best mods for CarX'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <Link to="/products" className="group w-full sm:w-auto bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 text-sm font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
              <ShoppingBag size={16} className="mr-2 group-hover:scale-110 transition-transform" />
              <span>{i18n.language === 'ru' ? 'КАТАЛОГ' : 'BROWSE MODS'}</span>
              <ArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" size={16} />
            </Link>
            <Link to="/register" className="w-full sm:w-auto border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 text-sm font-bold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
              <span>{i18n.language === 'ru' ? 'РЕГИСТРАЦИЯ' : 'SIGN UP'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
