import { useTranslation } from 'react-i18next'
import { Book, ShoppingCart, MessageSquare, DollarSign } from 'lucide-react'

const Docs = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="CarxMods" className="h-20" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Как купить моды' : 'How to Buy Mods'}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === 'ru' 
              ? 'Простое руководство по покупке модов для CarX Street'
              : 'Simple guide to buying mods for CarX Street'}
          </p>
        </div>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Book className="w-8 h-8 text-blue-600" />
            {i18n.language === 'ru' ? 'Шаг 1: Регистрация' : 'Step 1: Registration'}
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Создайте аккаунт на сайте, указав username, email и пароль. Это займет 1 минуту.'
                : 'Create an account on the site with username, email and password. Takes 1 minute.'}
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-700">
                <strong>{i18n.language === 'ru' ? 'Важно:' : 'Important:'}</strong> {i18n.language === 'ru' ? 'Используйте реальный email для связи' : 'Use real email for communication'}
              </p>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            {i18n.language === 'ru' ? 'Шаг 2: Выбор мода' : 'Step 2: Choose Mod'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Просмотр каталога' : 'Browse Catalog'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ru'
                  ? 'Перейдите в раздел "Мод паки" и выберите интересующий вас мод. Изучите описание, скриншоты и цену.'
                  : 'Go to "Mod Packs" section and select the mod you\'re interested in. Review description, screenshots and price.'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Создание сделки' : 'Create Deal'}
              </h3>
              <p className="text-gray-600 mb-2">
                {i18n.language === 'ru'
                  ? 'Нажмите кнопку "Купить". Вы будете перенаправлены в чат со мной.'
                  : 'Click "Buy" button. You will be redirected to chat with me.'}
              </p>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-yellow-600" />
            {i18n.language === 'ru' ? 'Шаг 3: Оплата Steam Gift Card' : 'Step 3: Payment with Steam Gift Card'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? '💳 Только Steam Gift Cards!' : '💳 Steam Gift Cards Only!'}
              </h3>
              <p className="text-gray-700 mb-4">
                {i18n.language === 'ru'
                  ? 'Оплата производится ТОЛЬКО подарочными картами Steam. Никаких других способов оплаты нет.'
                  : 'Payment is made ONLY with Steam Gift Cards. No other payment methods available.'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'ru' ? 'Как оплатить:' : 'How to pay:'}
              </h3>
              <ol className="space-y-3 text-gray-600 list-decimal list-inside">
                <li>{i18n.language === 'ru' ? 'Купите Steam Gift Card на нужную сумму' : 'Buy Steam Gift Card for required amount'}</li>
                <li>{i18n.language === 'ru' ? 'Я отправлю вам инструкции в чате' : 'I will send you instructions in chat'}</li>
                <li>{i18n.language === 'ru' ? 'Отправьте мне код карты в чат (ТОЛЬКО в чат на сайте!)' : 'Send me card code in chat (ONLY in site chat!)'}</li>
                <li>{i18n.language === 'ru' ? 'Дождитесь подтверждения оплаты' : 'Wait for payment confirmation'}</li>
              </ol>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-red-700 font-medium">
                ⚠️ {i18n.language === 'ru' 
                  ? 'ВНИМАНИЕ: Никогда не отправляйте код карты никому кроме меня через чат на этом сайте!'
                  : 'WARNING: Never send card code to anyone except me through chat on this site!'}
              </p>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-600" />
            {i18n.language === 'ru' ? 'Шаг 4: Получение файлов' : 'Step 4: Receive Files'}
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'После подтверждения оплаты я отправлю вам файлы мода в чат. Обычно это занимает до 24 часов.'
                : 'After payment confirmation, I will send you mod files in chat. Usually takes up to 24 hours.'}
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>{i18n.language === 'ru' ? 'Вы получите:' : 'You will receive:'}</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{i18n.language === 'ru' ? 'Файлы мода' : 'Mod files'}</li>
                <li>{i18n.language === 'ru' ? 'Инструкцию по установке' : 'Installation instructions'}</li>
                <li>{i18n.language === 'ru' ? 'Техническую поддержку' : 'Technical support'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Установка модов' : 'Installing Mods'}
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Каждый мод поставляется с подробной инструкцией. Обычный процесс:'
                : 'Each mod comes with detailed instructions. Typical process:'}
            </p>
            <ol className="space-y-2 text-gray-600 list-decimal list-inside">
              <li>{i18n.language === 'ru' ? 'Сделайте резервную копию файлов игры' : 'Backup game files'}</li>
              <li>{i18n.language === 'ru' ? 'Распакуйте архив с модом' : 'Extract mod archive'}</li>
              <li>{i18n.language === 'ru' ? 'Скопируйте файлы в папку игры' : 'Copy files to game folder'}</li>
              <li>{i18n.language === 'ru' ? 'Запустите игру и проверьте' : 'Launch game and test'}</li>
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Частые вопросы' : 'FAQ'}
          </h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Почему только Steam Gift Cards?' : 'Why only Steam Gift Cards?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Это самый безопасный и удобный способ оплаты для обеих сторон. Нет комиссий и чарджбеков.'
                  : 'It\'s the safest and most convenient payment method for both sides. No fees and chargebacks.'}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Как быстро я получу мод?' : 'How fast will I receive the mod?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Обычно в течение 24 часов после оплаты. Часто быстрее, если я онлайн.'
                  : 'Usually within 24 hours after payment. Often faster if I\'m online.'}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Что если мод не работает?' : 'What if mod doesn\'t work?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Напишите мне в чат - помогу с установкой. Если проблема в моде - верну деньги или заменю мод.'
                  : 'Message me in chat - I\'ll help with installation. If problem is with mod - will refund or replace.'}
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="font-bold text-gray-900 cursor-pointer">
                {i18n.language === 'ru' ? 'Безопасны ли моды?' : 'Are mods safe?'}
              </summary>
              <p className="text-gray-600 mt-3">
                {i18n.language === 'ru'
                  ? 'Да, все моды созданы мной лично и проверены. Никаких вирусов. Однако используйте на свой риск - всегда делайте бэкап.'
                  : 'Yes, all mods are created by me personally and tested. No viruses. However use at your own risk - always backup.'}
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Docs
