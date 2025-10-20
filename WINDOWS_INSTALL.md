# 🪟 Установка на Windows - ИСПРАВЛЕНО!

## ✅ Все проблемы решены!

Были исправлены 2 критические ошибки для Windows:

### 1️⃣ psycopg2-binary (требовал PostgreSQL)
```
Error: pg_config executable not found
```
**Решение:** Удален, используем `asyncpg` ✅

### 2️⃣ python-jose[cryptography] (требовал Rust)
```
Cargo, the Rust package manager, is not installed
```
**Решение:** Заменен на `PyJWT` ✅

---

## 🚀 Установка (3 простых шага)

### Шаг 1: Запустите установку

```bash
setup.bat
```

Или вручную:
```bash
cd api
pip install -r requirements.txt

cd ..\client
npm install
```

### Шаг 2: Настройте базу данных

Создайте файл `.env` в корне:
```env
DATABASE_URL=postgresql+asyncpg://localhost/carxmods
JWT_SECRET=super-secret-key-min-32-characters-long-change-me
ADMIN_USERNAME=seller
ADMIN_PASSWORD=admin123
```

Инициализируйте БД:
```bash
cd api
python init_db.py
```

### Шаг 3: Запустите проект

Откройте 2 терминала PowerShell:

**Терминал 1:**
```bash
cd api
uvicorn main:app --reload --port 8000
```

**Терминал 2:**
```bash
cd client
npm run dev
```

Откройте: **http://localhost:5173**

---

## 🎯 Готово!

Вход как админ:
- Логин: `seller`
- Пароль: `admin123`

---

## ❓ Проблемы?

### TypeScript ошибки в IDE?
Это нормально до `npm install`. После установки все исчезнет.

### Python ошибки?
Убедитесь что Python 3.11+ установлен:
```bash
python --version
```

### База данных?
Для начала можно использовать **Neon** (бесплатная облачная PostgreSQL):
https://neon.tech

Просто получите connection string и добавьте в `.env`

---

**Теперь все работает на Windows БЕЗ дополнительных зависимостей! 🎉**
