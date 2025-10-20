# 🚀 Быстрый старт

## 1️⃣ Установка (ОБЯЗАТЕЛЬНО!)

### Автоматическая установка

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh && ./setup.sh
```

### Ручная установка

```bash
# Frontend
cd client
npm install

# Backend
cd ../api
pip install -r requirements.txt
```

## 2️⃣ Настройка базы данных

Создайте файл `.env` в корне:

```env
DATABASE_URL=postgresql+asyncpg://localhost/carxmods
JWT_SECRET=your-secret-key-change-this-min-32-characters-long
ADMIN_USERNAME=seller
ADMIN_PASSWORD=admin123
```

Инициализируйте БД:

```bash
cd api
python init_db.py
```

## 3️⃣ Запуск

Откройте **2 терминала**:

**Терминал 1 (Backend):**
```bash
cd api
uvicorn main:app --reload --port 8000
```

**Терминал 2 (Frontend):**
```bash
cd client
npm run dev
```

## 4️⃣ Откройте браузер

http://localhost:5173

### Вход как админ:
- Логин: `seller`
- Пароль: `admin123`

---

## ❓ FAQ

### Видите ошибки в IDE?

**Это нормально!** Ошибки `Cannot find module` появляются потому что зависимости еще не установлены.

✅ **Решение:** Запустите `setup.bat` (Windows) или `setup.sh` (Linux/Mac)

После установки все ошибки исчезнут автоматически!

### Проблемы с установкой?

1. Проверьте что у вас установлены:
   - Python 3.11+
   - Node.js 18+
   - PostgreSQL (или используйте Neon)

2. Смотрите полную документацию:
   - `GETTING_STARTED.md` - Детальная инструкция
   - `FIX_ERRORS.md` - Исправление ошибок
   - `DEPLOY.md` - Деплой на Vercel

---

**Готово! Приятного использования! 🎉**
