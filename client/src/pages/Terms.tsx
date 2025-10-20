import { useTranslation } from 'react-i18next'

const Terms = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Пользовательское соглашение' : 'Terms of Service'}
          </h1>
          <p className="text-gray-600">
            {i18n.language === 'ru' ? 'Последнее обновление: 20 октября 2024' : 'Last updated: October 20, 2024'}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '1. Общие положения' : '1. General Terms'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {i18n.language === 'ru'
                ? 'Настоящее Пользовательское соглашение (далее - "Соглашение") регулирует отношения между CarxMods (далее - "Платформа") и пользователем (далее - "Пользователь") при использовании сайта carxstreetmods.vercel.app.'
                : 'This Terms of Service Agreement (hereinafter - "Agreement") governs the relationship between CarxMods (hereinafter - "Platform") and the user (hereinafter - "User") when using the site carxstreetmods.vercel.app.'}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Используя Платформу, Пользователь соглашается с условиями настоящего Соглашения. Если Пользователь не согласен с условиями, он должен прекратить использование Платформы.'
                : 'By using the Platform, the User agrees to the terms of this Agreement. If the User does not agree with the terms, they must stop using the Platform.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '2. Регистрация и учетные записи' : '2. Registration and Accounts'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '2.1. Для использования функций Платформы Пользователь должен создать учетную запись.'
                  : '2.1. To use Platform features, User must create an account.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '2.2. Пользователь обязуется предоставить достоверную информацию при регистрации.'
                  : '2.2. User agrees to provide accurate information during registration.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '2.3. Пользователь несет ответственность за сохранность своих учетных данных.'
                  : '2.3. User is responsible for security of their credentials.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '2.4. Запрещено создавать несколько аккаунтов для обхода ограничений.'
                  : '2.4. Creating multiple accounts to bypass restrictions is prohibited.'}
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '3. Правила использования' : '3. Usage Rules'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '3.1. Пользователь обязуется не нарушать законодательство при использовании Платформы.'
                  : '3.1. User agrees not to violate laws when using the Platform.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '3.2. Запрещено размещать контент, нарушающий авторские права третьих лиц.'
                  : '3.2. Posting content that violates third-party copyrights is prohibited.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '3.3. Запрещено распространять вирусы, вредоносное ПО или неработающие моды.'
                  : '3.3. Distributing viruses, malware or non-working mods is prohibited.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '3.4. Запрещено использовать Платформу для мошенничества или обмана других пользователей.'
                  : '3.4. Using Platform for fraud or deceiving other users is prohibited.'}
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '4. Покупка и продажа модов' : '4. Buying and Selling Mods'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '4.1. Продавец гарантирует, что продаваемые моды являются оригинальными или используются с разрешения автора.'
                  : '4.1. Seller guarantees that sold mods are original or used with author permission.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '4.2. Покупатель получает право на использование мода, но не на его распространение.'
                  : '4.2. Buyer receives right to use mod, but not to distribute it.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '4.3. Платформа взимает комиссию 10% с каждой продажи для поддержки сервиса.'
                  : '4.3. Platform charges 10% commission on each sale to support the service.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '4.4. Возврат средств возможен только в случае, если мод не соответствует описанию или не работает.'
                  : '4.4. Refunds are possible only if mod doesn\'t match description or doesn\'t work.'}
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '5. Платежи и комиссии' : '5. Payments and Fees'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '5.1. Все платежи обрабатываются через сторонние платежные системы.'
                  : '5.1. All payments are processed through third-party payment systems.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '5.2. Платформа не хранит данные банковских карт пользователей.'
                  : '5.2. Platform does not store users\' bank card data.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '5.3. Средства за сделку удерживаются до момента подтверждения покупателем получения мода.'
                  : '5.3. Funds for deal are held until buyer confirms mod receipt.'}
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '6. Ответственность' : '6. Liability'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? '6.1. Платформа не несет ответственности за качество модов, размещенных пользователями.'
                  : '6.1. Platform is not responsible for quality of mods posted by users.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '6.2. Пользователь использует моды на свой риск. Рекомендуется делать резервные копии файлов игры.'
                  : '6.2. User uses mods at their own risk. Backing up game files is recommended.'}
              </p>
              <p>
                {i18n.language === 'ru'
                  ? '6.3. Платформа не несет ответственности за споры между покупателями и продавцами, но может выступать посредником.'
                  : '6.3. Platform is not responsible for disputes between buyers and sellers, but can act as mediator.'}
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '7. Конфиденциальность' : '7. Privacy'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Мы собираем и обрабатываем персональные данные пользователей в соответствии с законодательством. Подробнее о защите данных читайте в нашей Политике конфиденциальности.'
                : 'We collect and process users\' personal data in accordance with legislation. Read more about data protection in our Privacy Policy.'}
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '8. Изменение условий' : '8. Terms Changes'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Платформа оставляет за собой право изменять условия настоящего Соглашения. Об изменениях Пользователь будет уведомлен по email. Продолжение использования Платформы после изменений означает согласие с новыми условиями.'
                : 'Platform reserves the right to change terms of this Agreement. User will be notified of changes via email. Continued use of Platform after changes means agreement with new terms.'}
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '9. Блокировка аккаунта' : '9. Account Suspension'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {i18n.language === 'ru'
                  ? 'Платформа имеет право заблокировать аккаунт Пользователя в следующих случаях:'
                  : 'Platform has the right to suspend User account in following cases:'}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>{i18n.language === 'ru' ? 'Нарушение условий Соглашения' : 'Violation of Agreement terms'}</li>
                <li>{i18n.language === 'ru' ? 'Мошенничество или обман других пользователей' : 'Fraud or deceiving other users'}</li>
                <li>{i18n.language === 'ru' ? 'Размещение запрещенного контента' : 'Posting prohibited content'}</li>
                <li>{i18n.language === 'ru' ? 'Множественные жалобы от других пользователей' : 'Multiple complaints from other users'}</li>
              </ul>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'ru' ? '10. Контакты' : '10. Contact'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {i18n.language === 'ru'
                ? 'По всем вопросам, связанным с настоящим Соглашением, обращайтесь:'
                : 'For all questions related to this Agreement, contact:'}
            </p>
            <div className="bg-gray-50 rounded-lg p-6 space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@carxstreetmods.com</p>
              <p><strong>{i18n.language === 'ru' ? 'Поддержка:' : 'Support:'}</strong> support@carxstreetmods.com</p>
              <p><strong>{i18n.language === 'ru' ? 'Сайт:' : 'Website:'}</strong> carxstreetmods.vercel.app</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms
