# Руководство по деплою на Vercel

## Подготовка

### 1. Создайте базу данных Neon PostgreSQL

1. Зайдите на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте connection string (формат: `postgresql://user:pass@host/dbname`)

### 2. Настройте переменные окружения в Vercel

Добавьте следующие переменные в настройках проекта Vercel:

```
DATABASE_URL=postgresql://your-neon-connection-string
JWT_SECRET=your-random-secret-key-min-32-chars
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Admin credentials
ADMIN_USERNAME=seller
ADMIN_PASSWORD=your-secure-password

# Optional: Telegram Bot
TELEGRAM_BOT_TOKEN=your-bot-token

# Optional: Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Инициализируйте базу данных

После первого деплоя выполните локально:

```bash
cd api
python init_db.py
```

Это создаст:
- Таблицы базы данных
- Админ аккаунт (seller)
- Примеры категорий и товаров

## Деплой

### Вариант 1: Через Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Вариант 2: Через GitHub

1. Создайте репозиторий на GitHub
2. Загрузите код:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/carxmods.git
git push -u origin main
```
3. Импортируйте проект в Vercel через интерфейс
4. Vercel автоматически обнаружит конфигурацию

## Настройка Telegram бота (опционально)

1. Создайте бота через @BotFather в Telegram
2. Получите токен
3. Добавьте в переменные окружения `TELEGRAM_BOT_TOKEN`
4. Получите ваш chat_id:
   - Напишите боту /start
   - Откройте: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Найдите chat_id в ответе

## Настройка Email (опционально)

Для Gmail:
1. Включите 2FA в настройках Google аккаунта
2. Создайте App Password: https://myaccount.google.com/apppasswords
3. Используйте этот пароль в `SMTP_PASSWORD`

## Проверка работы

После деплоя:

1. Откройте ваш сайт
2. Зарегистрируйте тестового пользователя
3. Войдите как админ (seller / ваш пароль)
4. Проверьте админ панель
5. Создайте тестовую сделку

## Обновление

Для обновления проекта:

```bash
git add .
git commit -m "Update"
git push
```

Vercel автоматически задеплоит изменения.

## Безопасность

⚠️ **ВАЖНО:**

1. Смените пароль админа после первого входа
2. Используйте сильные JWT_SECRET (минимум 32 символа)
3. Не коммитьте .env файлы в git
4. Используйте HTTPS для production

## Поддержка

При проблемах проверьте:
- Логи Vercel
- Правильность connection string БД
- Наличие всех переменных окружения
