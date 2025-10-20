# ✅ Чеклист деплоя CarX Mods Club

## 📋 Перед деплоем

### 1. Подготовка репозитория
- [ ] Весь код закоммичен в Git
- [ ] `.env` файлы НЕ закоммичены (в `.gitignore`)
- [ ] Проект работает локально
- [ ] База данных инициализирована

### 2. Подготовка сервисов

#### Neon PostgreSQL (Database)
- [ ] Создан аккаунт на https://neon.tech
- [ ] Создана база данных
- [ ] Скопирован connection string
- [ ] Connection string в формате: `postgresql+asyncpg://...?sslmode=require`

#### Railway / Render (Backend)
- [ ] Создан аккаунт
- [ ] Подключен GitHub репозиторий
- [ ] Python environment определен

#### Vercel (Frontend)
- [ ] Создан аккаунт на https://vercel.com
- [ ] Подключен GitHub репозиторий

---

## 🚀 Деплой Backend (Railway)

### Environment Variables:
```env
DATABASE_URL=postgresql+asyncpg://user:pass@host/db?sslmode=require
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
ADMIN_USERNAME=seller
ADMIN_PASSWORD=strong-secure-password-change-this
PORT=8000
FRONTEND_URL=https://your-app.vercel.app
TELEGRAM_BOT_TOKEN=your-bot-token (optional)
SMTP_HOST=smtp.gmail.com (optional)
SMTP_USER=your-email@gmail.com (optional)
SMTP_PASSWORD=your-app-password (optional)
```

### Проверка:
- [ ] Backend деплоится без ошибок
- [ ] Открывается `/docs` (Swagger UI)
- [ ] Endpoint `/api/health` отвечает
- [ ] Скопирован backend URL (например: `https://carxmods.up.railway.app`)

---

## 🎨 Деплой Frontend (Vercel)

### Настройки проекта:
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables:
```env
VITE_API_URL=https://your-backend.railway.app
VITE_WS_URL=wss://your-backend.railway.app
```

### Проверка:
- [ ] Frontend деплоится без ошибок
- [ ] Сайт открывается
- [ ] Нет ошибок в консоли браузера
- [ ] Можно открыть страницы

---

## 🗄️ Инициализация базы данных

### Вариант 1: Локально
```bash
cd api
# Создайте .env с DATABASE_URL из Neon
python init_db.py
```

### Вариант 2: Через Railway CLI
```bash
railway run python api/init_db.py
```

### Проверка:
- [ ] Таблицы созданы
- [ ] Админ пользователь создан
- [ ] Можно войти через frontend

---

## 🔧 Настройка CORS

В `api/main.py` обновите origins:

```python
origins = [
    "https://your-app.vercel.app",  # ваш Vercel URL
    "http://localhost:5173",        # для разработки
    "*",  # или используйте это для тестирования (небезопасно для production)
]
```

Пересоберите backend после изменения.

---

## ✅ Финальные проверки

### Frontend:
- [ ] Главная страница загружается
- [ ] Login/Register работают
- [ ] Можно войти в систему
- [ ] Можно просмотреть товары
- [ ] Навигация работает

### Backend API:
- [ ] `/docs` открывается
- [ ] `/api/auth/login` работает
- [ ] `/api/auth/register` работает
- [ ] `/api/products` возвращает данные
- [ ] CORS настроен правильно

### Database:
- [ ] Подключение стабильное
- [ ] Данные сохраняются
- [ ] Админ может войти

---

## 🐛 Типичные проблемы

### CORS errors:
**Проблема:** `Access to fetch blocked by CORS policy`
**Решение:** Обновите `origins` в `main.py` с правильным Vercel URL

### Database connection error:
**Проблема:** `Could not connect to database`
**Решение:** 
- Проверьте формат connection string: `postgresql+asyncpg://...`
- Убедитесь что `?sslmode=require` в конце
- Проверьте что Neon database запущен

### 500 Server Error:
**Проблема:** Backend возвращает 500
**Решение:**
- Проверьте логи в Railway/Render
- Убедитесь что все environment variables установлены
- Проверьте что `requirements.txt` полный

### Frontend can't connect to backend:
**Проблема:** `Failed to fetch` или сетевые ошибки
**Решение:**
- Проверьте `VITE_API_URL` в Vercel environment variables
- Убедитесь что backend URL правильный
- Проверьте что backend запущен

---

## 📊 Мониторинг

### Railway Dashboard:
- Проверяйте логи
- Мониторьте использование ресурсов
- Проверяйте uptime

### Vercel Dashboard:
- Проверяйте deployment logs
- Мониторьте трафик
- Проверяйте ошибки

### Neon Dashboard:
- Мониторьте использование storage
- Проверяйте подключения
- Бэкапы (если настроены)

---

## 🎉 После успешного деплоя

1. **Протестируйте все функции:**
   - Регистрация
   - Вход
   - Просмотр товаров
   - Создание сделок (если применимо)

2. **Настройте мониторинг:**
   - Настройте Uptime Robot для мониторинга доступности
   - Подключите Sentry для отслеживания ошибок (optional)

3. **Обновите документацию:**
   - Сохраните все URLs
   - Документируйте environment variables
   - Сохраните credentials в безопасном месте

4. **Поделитесь:**
   - Отправьте ссылку команде
   - Проверьте на разных устройствах

---

## 🔒 Безопасность

После деплоя обязательно:
- [ ] Смените `JWT_SECRET` на уникальный (32+ символов)
- [ ] Установите сильный `ADMIN_PASSWORD`
- [ ] Проверьте что `.env` файлы не в Git
- [ ] Настройте CORS только для вашего домена
- [ ] Включите SSL/HTTPS (автоматически на Vercel/Railway)

---

## 💰 Стоимость

| Сервис | Tier | Месяц |
|--------|------|-------|
| Vercel | Hobby | $0 |
| Railway | Free | $0 (500 hours) |
| Neon | Free | $0 (0.5GB) |
| **ИТОГО** | | **$0** |

После использования бесплатных лимитов:
- Railway: $5-10/месяц
- Neon: $19/месяц (Pro) или бесплатно
- Vercel: остается бесплатным

---

**Готово! Ваш проект задеплоен! 🎊**
