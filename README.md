# CarX Mods Club - Trading Platform

Платформа для продажи паков модов с системой безопасных сделок.

## ⚠️ ВАЖНО: Видите ошибки в IDE?

Если вы видите ошибки `Cannot find module` - **это нормально!**  
Они исчезнут после установки зависимостей.

---

## 🚀 БЫСТРЫЙ СТАРТ:

### 1. Установка (один раз):
```bash
setup.bat
```

### 2. Настройка БД (один раз):
```bash
# Создайте .env файл
copy .env.example .env

# Отредактируйте DATABASE_URL и JWT_SECRET
# Затем:
init_database.bat
```

### 3. Запуск:
```bash
start.bat
```

**Готово!** Откроется http://localhost:5173

**Админ вход:** seller / (пароль из .env)

---

📚 **Подробнее:** См. `HOW_TO_RUN.md`

## Технологии

**Frontend:**
- React 18
- TypeScript
- TailwindCSS
- shadcn/ui
- React Router
- WebSocket для real-time

**Backend:**
- Python 3.11
- FastAPI
- SQLAlchemy
- WebSocket
- JWT Authentication

**Database:**
- Neon PostgreSQL

**Уведомления:**
- Email (SMTP)
- Telegram Bot API
- Browser Push Notifications

## Структура проекта

```
├── api/                 # Python FastAPI backend
│   ├── models/         # Database models
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   └── main.py         # Entry point
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── App.tsx     # Main app
│   └── public/
└── vercel.json         # Vercel configuration
```

## Установка и запуск

### Backend

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Переменные окружения

Создайте `.env` файл:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
TELEGRAM_BOT_TOKEN=your-bot-token
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password
```

## Деплой на Vercel

```bash
vercel --prod
```

## Функционал

- ✅ Регистрация и авторизация (логин/пароль)
- ✅ Личный кабинет пользователя
- ✅ Каталог модов с категориями
- ✅ Система сделок с чатом
- ✅ Оплата через Steam Gift Cards
- ✅ Real-time уведомления (Email, Telegram, Browser)
- ✅ Онлайн статус (WebSocket + активность)
- ✅ Админ панель для управления
- ✅ Мультиязычность (RU/EN)

## Админ доступ

Логин: `seller`
Пароль: установите при первом запуске
