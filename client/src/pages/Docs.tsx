import { useTranslation } from 'react-i18next'
import { Book, ShoppingCart, Upload, MessageSquare, DollarSign, Shield } from 'lucide-react'

const Docs = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Документация' : 'Documentation'}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === 'ru' 
              ? 'Узнайте, как пользоваться платформой CarxMods'
              : 'Learn how to use the CarxMods platform'}
          </p>
        </div>

        {/* Getting Started */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Book className="w-8 h-8 text-blue-600" />
            {i18n.language === 'ru' ? 'Начало работы' : 'Getting Started'}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? '1. Регистрация' : '1. Registration'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'Создайте аккаунт на платформе, указав имя пользователя, email и пароль. После регистрации вы сможете покупать и продавать моды.'
                  : 'Create an account on the platform by providing username, email and password. After registration you can buy and sell mods.'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? '2. Верификация' : '2. Verification'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'Подтвердите свой email, чтобы получить полный доступ к функциям платформы.'
                  : 'Verify your email to get full access to platform features.'}
              </p>
            </div>
          </div>
        </section>

        {/* Buying Mods */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            {i18n.language === 'ru' ? 'Покупка модов' : 'Buying Mods'}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Шаг 1: Найдите мод' : 'Step 1: Find a Mod'}
              </h3>
              <p className="text-gray-600 mb-2">
                {i18n.language === 'ru'
                  ? 'Перейдите в раздел "Мод паки" и выберите интересующий вас мод. Изучите описание, скриншоты и цену.'
                  : 'Go to "Mod Packs" section and select the mod you\'re interested in. Review description, screenshots and price.'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Шаг 2: Создайте сделку' : 'Step 2: Create a Deal'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'Нажмите "Купить" и создайте сделку. Вы будете перенаправлены в чат с продавцом.'
                  : 'Click "Buy" and create a deal. You will be redirected to chat with the seller.'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Шаг 3: Получите файлы' : 'Step 3: Receive Files'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'Продавец отправит вам файлы мода в чате. Скачайте и установите их согласно инструкциям.'
                  : 'Seller will send you mod files in chat. Download and install them according to instructions.'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Шаг 4: Завершите сделку' : 'Step 4: Complete Deal'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'После получения файлов нажмите "Завершить сделку". Деньги будут переведены продавцу.'
                  : 'After receiving files, click "Complete Deal". Money will be transferred to the seller.'}
              </p>
            </div>
          </div>
        </section>

        {/* Selling Mods */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Upload className="w-8 h-8 text-purple-600" />
            {i18n.language === 'ru' ? 'Продажа модов' : 'Selling Mods'}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Требования к модам' : 'Mod Requirements'}
              </h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>{i18n.language === 'ru' ? 'Оригинальный контент или с разрешением автора' : 'Original content or with author permission'}</li>
                <li>{i18n.language === 'ru' ? 'Рабочие файлы без вирусов' : 'Working files without viruses'}</li>
                <li>{i18n.language === 'ru' ? 'Качественные скриншоты/видео' : 'Quality screenshots/videos'}</li>
                <li>{i18n.language === 'ru' ? 'Подробное описание установки' : 'Detailed installation description'}</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Как добавить мод' : 'How to Add a Mod'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'Обратитесь к администратору для получения доступа к панели продавца. Загрузите изображения, заполните описание и установите цену.'
                  : 'Contact administrator to get seller panel access. Upload images, fill description and set price.'}
              </p>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-yellow-600" />
            {i18n.language === 'ru' ? 'Оплата' : 'Payment'}
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Мы принимаем следующие способы оплаты:'
                : 'We accept the following payment methods:'}
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>{i18n.language === 'ru' ? 'Банковские карты (Visa, Mastercard)' : 'Credit cards (Visa, Mastercard)'}</li>
              <li>{i18n.language === 'ru' ? 'Электронные кошельки' : 'E-wallets'}</li>
              <li>{i18n.language === 'ru' ? 'Криптовалюта' : 'Cryptocurrency'}</li>
            </ul>
          </div>
        </section>

        {/* Support */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            {i18n.language === 'ru' ? 'Поддержка и безопасность' : 'Support & Security'}
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Если у вас возникли проблемы:'
                : 'If you experience issues:'}
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>{i18n.language === 'ru' ? 'Свяжитесь с поддержкой: support@carxstreetmods.com' : 'Contact support: support@carxstreetmods.com'}</li>
              <li>{i18n.language === 'ru' ? 'Откройте спор в сделке (кнопка "Спор")' : 'Open a dispute in the deal ("Dispute" button)'}</li>
              <li>{i18n.language === 'ru' ? 'Напишите в Discord/Telegram' : 'Write in Discord/Telegram'}</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
            {i18n.language === 'ru' ? 'Частые вопросы' : 'FAQ'}
          </h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Как установить моды?' : 'How to install mods?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Каждый мод содержит инструкцию по установке. Обычно нужно скопировать файлы в папку с игрой.'
                  : 'Each mod contains installation instructions. Usually you need to copy files to game folder.'}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Что делать, если мод не работает?' : 'What if mod doesn\'t work?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Свяжитесь с продавцом через чат или откройте спор. Мы вернем деньги если мод действительно не работает.'
                  : 'Contact seller through chat or open a dispute. We will refund if mod really doesn\'t work.'}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Безопасны ли моды?' : 'Are mods safe?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Мы проверяем все моды на вирусы, но рекомендуем использовать антивирус.'
                  : 'We check all mods for viruses, but recommend using antivirus.'}
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Docs
