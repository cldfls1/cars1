# 🚀 Деплой на Vercel

## ⚠️ Важно

**Vercel имеет ограничения для бесплатного tier:**
- Serverless functions имеют timeout 10 секунд
- WebSocket не поддерживается в serverless
- База данных должна быть внешняя (Neon PostgreSQL)

## Рекомендуемая архитектура

### Вариант 1: Vercel Frontend + External Backend (РЕКОМЕНДУЕТСЯ)

**Frontend на Vercel:**
- React приложение
- Статическая генерация
- Быстрый CDN

**Backend на другом хостинге:**
- Railway.app (поддержка WebSocket, бесплатный tier)
- Render.com (бесплатный tier с WebSocket)
- DigitalOcean App Platform ($5/месяц)
- Heroku ($5-7/месяц)

### Вариант 2: Все на Vercel (ограничения)

**Что работает:**
- ✅ REST API endpoints
- ✅ Авторизация (JWT)
- ✅ CRUD операции
- ✅ Static frontend

**Что НЕ работает:**
- ❌ WebSocket (real-time чат)
- ❌ Длительные операции (>10 сек)
- ❌ Background tasks

---

## 📦 Шаг 1: Подготовка базы данных

### Используйте Neon PostgreSQL (бесплатно)

1. Зарегистрируйтесь на https://neon.tech
2. Создайте новый проект
3. Скопируйте connection string

---

## 🔧 Шаг 2: Деплой Frontend на Vercel

### Через Vercel Dashboard:

1. Зайдите на https://vercel.com
2. Нажмите **"New Project"**
3. Импортируйте Git репозиторий
4. **Framework Preset:** Vite
5. **Root Directory:** `client`
6. **Build Command:** `npm run build`
7. **Output Directory:** `dist`
8. **Install Command:** `npm install`

### Environment Variables (Vercel Dashboard):

```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🐍 Шаг 3: Деплой Backend (Railway - РЕКОМЕНДУЕТСЯ)

### Railway.app (Бесплатно + WebSocket):

1. Зарегистрируйтесь на https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Выберите репозиторий
4. Railway автоматически определит Python
5. Установите переменные окружения:

```env
DATABASE_URL=postgresql+asyncpg://... (из Neon)
JWT_SECRET=your-super-secret-key-min-32-chars
ADMIN_USERNAME=seller
ADMIN_PASSWORD=your-secure-password
PORT=8000
```

6. Добавьте `Procfile` в корень проекта:
```
web: cd api && uvicorn main:app --host 0.0.0.0 --port $PORT
```

7. Railway даст вам URL типа: `https://your-app.up.railway.app`

### Обновите frontend:

В Vercel Environment Variables измените:
```env
VITE_API_URL=https://your-app.up.railway.app
```

---

## 🔄 Шаг 4: Инициализация базы данных

После деплоя backend, выполните:

```bash
# Локально с подключением к Neon
cd api
python init_db.py
```

Или создайте endpoint для инициализации (только для админа).

---

## ✅ Проверка деплоя

### Frontend (Vercel):
- Откройте `https://your-app.vercel.app`
- Проверьте что страницы загружаются
- Проверьте консоль на ошибки

### Backend (Railway):
- Откройте `https://your-app.up.railway.app/docs`
- Должна открыться Swagger документация
- Проверьте `/api/health` endpoint

### Подключение:
- Зарегистрируйтесь на фронтенде
- Войдите в систему
- Проверьте что API запросы работают

---

## 🐛 Решение проблем

### CORS ошибки:

В `api/main.py` обновите CORS origins:
```python
origins = [
    "https://your-app.vercel.app",
    "http://localhost:5173",  # для разработки
]
```

### База данных не подключается:

Проверьте connection string:
```python
# Должен быть формат:
# postgresql+asyncpg://user:pass@host/db?sslmode=require
```

### WebSocket не работает:

WebSocket НЕ работает на Vercel serverless functions.
Используйте Railway/Render для backend.

---

## 💰 Стоимость (бесплатные тиры)

| Сервис | Лимиты | Цена |
|--------|--------|------|
| **Vercel** (Frontend) | 100GB bandwidth, Serverless | **Бесплатно** |
| **Railway** (Backend) | 500 часов/месяц, $5 credit | **Бесплатно** |
| **Neon** (Database) | 0.5 GB storage, 1 проект | **Бесплатно** |

**Итого: $0/месяц** для старта! 🎉

---

## 📝 Альтернативные варианты

### Render.com (Backend):
- Бесплатный tier
- WebSocket поддержка
- Auto-sleep после 15 мин неактивности

### DigitalOcean App Platform:
- $5/месяц
- Без sleep
- Лучшая производительность

### Heroku:
- $5-7/месяц
- Проверенное решение
- Много аддонов

---

## 🎯 Рекомендация

**Для production:**
1. **Frontend:** Vercel (бесплатно)
2. **Backend:** Railway или DigitalOcean ($0-5/мес)
3. **Database:** Neon PostgreSQL (бесплатно)

Это даст вам:
- ✅ Полную функциональность (включая WebSocket)
- ✅ Хорошую производительность
- ✅ Масштабируемость
- ✅ Низкую стоимость

---

Нужна помощь с деплоем? Смотрите файлы:
- `DEPLOY.md` - детальная инструкция
- `.env.example` - пример переменных окружения
