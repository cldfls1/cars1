# Быстрый старт для разработки

## Требования

- **Python 3.11+**
- **Node.js 18+**
- **PostgreSQL** (или Neon database)

## Установка

### 1. Клонируйте репозиторий (если используете git)

```bash
git clone https://github.com/your-username/carxmods.club.git
cd carxmods.club
```

### 2. Настройте базу данных

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/carxmods
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
ADMIN_USERNAME=seller
ADMIN_PASSWORD=admin123
```

### 3. Установите зависимости

**Backend:**
```bash
cd api
pip install -r requirements.txt
```

**Frontend:**
```bash
cd client
npm install
```

### 4. Инициализируйте базу данных

```bash
cd api
python init_db.py
```

Это создаст:
- ✓ Все таблицы
- ✓ Админ аккаунт (seller)
- ✓ Примеры категорий и товаров

## Запуск для разработки

Откройте **два терминала**:

**Терминал 1 - Backend:**
```bash
cd api
uvicorn main:app --reload --port 8000
```

**Терминал 2 - Frontend:**
```bash
cd client
npm run dev
```

Откройте браузер: **http://localhost:5173**

## Первый вход

### Как админ:
- Логин: `seller`
- Пароль: `admin123` (измените в `.env`)

### Создайте тестового пользователя:
1. Нажмите "Регистрация"
2. Введите логин и пароль
3. Войдите и протестируйте покупку

## Структура проекта

```
carxmods.club/
├── api/                    # Python FastAPI backend
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── services/          # Business logic
│   ├── main.py            # App entry point
│   ├── database.py        # DB configuration
│   └── init_db.py         # DB initialization script
│
├── client/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # State management (Zustand)
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities
│   │   ├── App.tsx       # Main app component
│   │   ├── main.tsx      # Entry point
│   │   └── i18n.ts       # Internationalization
│   └── public/
│
├── .env.example           # Example environment variables
├── vercel.json            # Vercel deployment config
├── README.md              # Main documentation
├── DEPLOY.md              # Deployment instructions
└── GETTING_STARTED.md     # This file
```

## Основные функции

### Для пользователей:
- ✅ Регистрация и вход (логин/пароль)
- ✅ Просмотр каталога товаров
- ✅ Создание сделки (покупка)
- ✅ Чат с продавцом
- ✅ Отправка Steam Gift Card кода
- ✅ Получение ссылки на скачивание
- ✅ История сделок
- ✅ Настройка уведомлений

### Для админа (seller):
- ✅ Просмотр всех сделок
- ✅ Принятие/отклонение сделок
- ✅ Проверка Steam карт
- ✅ Отправка ссылок на скачивание
- ✅ Управление пользователями (бан)
- ✅ Статистика продаж
- ✅ Управление товарами (через API)

## Тестирование системы сделок

1. **Зарегистрируйтесь** как обычный пользователь
2. **Выберите товар** и нажмите "Купить"
3. **Откроется чат** - сделка создана со статусом "Pending"
4. **Войдите как админ** в другом окне/браузере
5. **Перейдите в Deals** - увидите новую сделку
6. **Откройте сделку** и нажмите "Accept Deal"
7. **Вернитесь к пользователю** - теперь можно отправить Steam карту
8. **Введите код карты** и отправьте
9. **Админ проверяет код** и завершает сделку
10. **Пользователь получает** ссылку на скачивание

## WebSocket и уведомления

При создании сделки:
- ✅ Админ получит уведомление в реальном времени
- ✅ Браузерные push-уведомления (требуется разрешение)
- ✅ Email уведомления (если настроен SMTP)
- ✅ Telegram уведомления (если настроен бот)

## API Endpoints

Backend доступен на `http://localhost:8000`

**Документация API:** http://localhost:8000/docs

Основные эндпоинты:
- `POST /api/auth/login` - Вход
- `POST /api/auth/register` - Регистрация
- `GET /api/products` - Список товаров
- `POST /api/deals` - Создать сделку
- `GET /api/deals/{id}` - Детали сделки
- `WS /ws/{user_id}` - WebSocket соединение

## Проблемы и решения

### База данных не подключается
- Проверьте правильность DATABASE_URL
- Убедитесь что PostgreSQL запущен
- Для Neon используйте: `postgresql+asyncpg://...`

### Frontend не видит API
- Убедитесь что backend запущен на порту 8000
- Проверьте proxy настройки в `client/vite.config.ts`

### WebSocket не работает
- Проверьте что оба сервера запущены
- В production Vercel автоматически настроит роутинг

## Следующие шаги

1. ✅ Измените пароль админа
2. ✅ Добавьте свои товары через админ панель
3. ✅ Настройте Telegram бота (опционально)
4. ✅ Настройте Email уведомления (опционально)
5. ✅ Загрузите изображения для товаров
6. ✅ Подготовьте деплой на Vercel

## Полезные команды

```bash
# Пересоздать БД
cd api
python init_db.py

# Установить все зависимости
npm run install:all

# Запустить backend
npm run dev:api

# Запустить frontend
npm run dev:client

# Собрать frontend для production
cd client
npm run build
```

## Поддержка

Для вопросов и проблем создайте issue в GitHub репозитории.

---

**Удачи с вашей торговой платформой! 🚀**
