import { useTranslation } from 'react-i18next'

const Privacy = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-600">
            {i18n.language === 'ru' ? 'Последнее обновление: 20 октября 2024' : 'Last updated: October 20, 2024'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '1. Какие данные мы собираем' : '1. What Data We Collect'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? 'При регистрации и использовании сайта мы собираем следующую информацию:'
                  : 'When registering and using the site, we collect the following information:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{i18n.language === 'ru' ? 'Username (имя пользователя)' : 'Username'}</li>
                <li>{i18n.language === 'ru' ? 'Email адрес' : 'Email address'}</li>
                <li>{i18n.language === 'ru' ? 'Пароль (хранится в зашифрованном виде)' : 'Password (stored encrypted)'}</li>
                <li>{i18n.language === 'ru' ? 'История сделок' : 'Transaction history'}</li>
                <li>{i18n.language === 'ru' ? 'Сообщения в чате' : 'Chat messages'}</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '2. Как мы используем ваши данные' : '2. How We Use Your Data'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>{i18n.language === 'ru' ? 'Ваши данные используются для:' : 'Your data is used for:'}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{i18n.language === 'ru' ? 'Обработки покупок и доставки модов' : 'Processing purchases and delivering mods'}</li>
                <li>{i18n.language === 'ru' ? 'Связи с вами по вопросам сделок' : 'Contacting you about deals'}</li>
                <li>{i18n.language === 'ru' ? 'Технической поддержки' : 'Technical support'}</li>
                <li>{i18n.language === 'ru' ? 'Предотвращения мошенничества' : 'Preventing fraud'}</li>
                <li>{i18n.language === 'ru' ? 'Улучшения сервиса' : 'Improving service'}</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '3. Безопасность данных' : '3. Data Security'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? 'Мы используем следующие меры для защиты ваших данных:'
                  : 'We use the following measures to protect your data:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{i18n.language === 'ru' ? 'Шифрование паролей' : 'Password encryption'}</li>
                <li>{i18n.language === 'ru' ? 'Безопасное соединение HTTPS' : 'Secure HTTPS connection'}</li>
                <li>{i18n.language === 'ru' ? 'Защищенная база данных' : 'Protected database'}</li>
                <li>{i18n.language === 'ru' ? 'Ограниченный доступ к данным' : 'Limited data access'}</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '4. Передача данных третьим лицам' : '4. Sharing Data with Third Parties'}
            </h2>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Мы НЕ продаем и НЕ передаем ваши личные данные третьим лицам. Исключения составляют только случаи, когда это требуется по закону.'
                : 'We DO NOT sell or share your personal data with third parties. Exceptions are only cases required by law.'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '5. Cookies' : '5. Cookies'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? 'Мы используем cookies для:'
                  : 'We use cookies for:'}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{i18n.language === 'ru' ? 'Сохранения сессии (авторизации)' : 'Session storage (authentication)'}</li>
                <li>{i18n.language === 'ru' ? 'Запоминания языка интерфейса' : 'Remembering interface language'}</li>
                <li>{i18n.language === 'ru' ? 'Улучшения пользовательского опыта' : 'Improving user experience'}</li>
              </ul>
              <p className="mt-4">
                {i18n.language === 'ru'
                  ? 'Вы можете отключить cookies в настройках браузера, но это может повлиять на работу сайта.'
                  : 'You can disable cookies in browser settings, but this may affect site functionality.'}
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '6. Ваши права' : '6. Your Rights'}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>{i18n.language === 'ru' ? 'Вы имеете право:' : 'You have the right to:'}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{i18n.language === 'ru' ? 'Запросить копию своих данных' : 'Request a copy of your data'}</li>
                <li>{i18n.language === 'ru' ? 'Исправить неточные данные' : 'Correct inaccurate data'}</li>
                <li>{i18n.language === 'ru' ? 'Удалить свой аккаунт' : 'Delete your account'}</li>
                <li>{i18n.language === 'ru' ? 'Отозвать согласие на обработку данных' : 'Withdraw consent for data processing'}</li>
              </ul>
              <p className="mt-4">
                {i18n.language === 'ru'
                  ? 'Для реализации этих прав напишите на: support@carxstreetmods.com'
                  : 'To exercise these rights, email: support@carxstreetmods.com'}
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '7. Хранение данных' : '7. Data Retention'}
            </h2>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Мы храним ваши данные до тех пор, пока ваш аккаунт активен, или пока это необходимо для предоставления услуг. После удаления аккаунта данные удаляются в течение 30 дней.'
                : 'We store your data as long as your account is active, or as needed to provide services. After account deletion, data is removed within 30 days.'}
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '8. Дети' : '8. Children'}
            </h2>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Наш сайт не предназначен для лиц младше 13 лет. Мы не собираем намеренно данные детей. Если вы узнали, что ребенок предоставил нам свои данные, свяжитесь с нами.'
                : 'Our site is not intended for persons under 13 years old. We do not knowingly collect data from children. If you learned that a child provided us with their data, contact us.'}
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '9. Изменения в политике' : '9. Policy Changes'}
            </h2>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Мы можем обновлять эту политику. Об изменениях мы уведомим вас по email. Дата последнего обновления указана вверху страницы.'
                : 'We may update this policy. We will notify you of changes via email. Last update date is shown at the top of the page.'}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? 'Вопросы о конфиденциальности' : 'Privacy Questions'}
            </h2>
            <p className="text-gray-700 mb-4">
              {i18n.language === 'ru'
                ? 'Если у вас есть вопросы о том, как мы обрабатываем ваши данные, свяжитесь с нами:'
                : 'If you have questions about how we process your data, contact us:'}
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> support@carxstreetmods.com</p>
              <p><strong>{i18n.language === 'ru' ? 'Сайт:' : 'Website:'}</strong> carxstreetmods.vercel.app</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
