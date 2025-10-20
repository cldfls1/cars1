import { useTranslation } from 'react-i18next'

const Terms = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Условия покупки' : 'Terms of Purchase'}
          </h1>
          <p className="text-gray-600">
            {i18n.language === 'ru' ? 'Последнее обновление: 20 октября 2025' : 'Last updated: October 20, 2025'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '1. Общая информация' : '1. General Information'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Я продаю авторские моды для CarX Street напрямую покупателям через этот сайт. Покупая моды, вы соглашаетесь с данными условиями.'
                : 'I sell custom mods for CarX Street directly to buyers through this site. By purchasing mods, you agree to these terms.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '2. Оплата' : '2. Payment'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '• Оплата производится ТОЛЬКО Steam Gift Cards (подарочными картами Steam)'
                  : '• Payment is made ONLY with Steam Gift Cards'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• После создания сделки я отправлю вам инструкции по оплате в чате'
                  : '• After creating a deal, I will send you payment instructions in chat'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Моды отправляются только после подтверждения оплаты'
                  : '• Mods are sent only after payment confirmation'}
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '3. Доставка модов' : '3. Mod Delivery'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '• Моды отправляются в виде файлов через чат на сайте'
                  : '• Mods are sent as files through chat on the site'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Доставка происходит в течение 24 часов после оплаты'
                  : '• Delivery within 24 hours after payment'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Вместе с модом вы получите инструкцию по установке'
                  : '• You will receive installation instructions with the mod'}
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '4. Права использования' : '4. Usage Rights'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '• Моды предназначены только для личного использования'
                  : '• Mods are for personal use only'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Запрещено перепродавать или распространять купленные моды'
                  : '• Reselling or distributing purchased mods is prohibited'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Все моды являются авторскими и защищены правами'
                  : '• All mods are original and copyrighted'}
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '5. Возврат средств' : '5. Refunds'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '• Возврат возможен только если мод не работает или не соответствует описанию'
                  : '• Refunds possible only if mod doesn\'t work or doesn\'t match description'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Свяжитесь со мной через чат для решения проблем'
                  : '• Contact me through chat to resolve issues'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• После получения файлов возврат не производится'
                  : '• No refunds after receiving files'}
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '6. Техническая поддержка' : '6. Technical Support'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Я помогу с установкой и настройкой модов. Пишите мне в чат сделки или на email: support@carxstreetmods.com'
                : 'I will help with mod installation and setup. Message me in deal chat or email: support@carxstreetmods.com'}
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '7. Ответственность' : '7. Liability'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '• Используйте моды на свой риск'
                  : '• Use mods at your own risk'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Рекомендуется делать резервные копии файлов игры'
                  : '• Backing up game files is recommended'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '• Я не несу ответственности за бан в игре (моды безопасны, но используйте на свой страх)'
                  : '• I am not responsible for game bans (mods are safe, but use at your discretion)'}
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? 'Контакты' : 'Contact'}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> support@carxstreetmods.com</p>
              <p><strong>Discord:</strong> discord.gg/carxmods</p>
              <p><strong>Telegram:</strong> @carxmods</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms
