# 🚀 Как запустить проект

## 📋 Быстрый старт

### 1️⃣ Первый запуск (один раз)

```bash
# 1. Установить зависимости
setup.bat

# 2. Создать .env файл
copy .env.example .env
# Отредактируй .env (DATABASE_URL, JWT_SECRET, пароль админа)

# 3. Инициализировать базу данных
init_database.bat
```

### 2️⃣ Запуск серверов

```bash
# Запустить ВСЕ (Backend + Frontend)
start.bat
```

**Или по отдельности:**
```bash
# Только Backend (http://localhost:8000)
start_backend.bat

# Только Frontend (http://localhost:5173)
start_frontend.bat
```

### 3️⃣ Остановка серверов

```bash
stop.bat
```

---

## 📁 Созданные BAT файлы:

### 🔧 Установка и настройка:
- **`setup.bat`** - Установка всех зависимостей (Python + Node.js)
- **`install_step_by_step.bat`** - Пошаговая установка (для диагностики)
- **`init_database.bat`** - Инициализация базы данных

### ▶️ Запуск:
- **`start.bat`** - Запуск Backend + Frontend (открывает 2 окна)
- **`start_backend.bat`** - Только Backend сервер
- **`start_frontend.bat`** - Только Frontend сервер

### ⏹️ Остановка:
- **`stop.bat`** - Остановка всех серверов

---

## 🌐 Адреса после запуска:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 👤 Вход в админ панель:

После инициализации БД:
- **Логин:** `seller`
- **Пароль:** смотри в `.env` (`ADMIN_PASSWORD`)

---

## 💡 Советы:

1. **Первый запуск:** Обязательно выполни все шаги из "Первый запуск"
2. **Ошибки установки:** Используй `install_step_by_step.bat` для диагностики
3. **База данных:** Для Neon PostgreSQL используй их connection string в `.env`
4. **Остановка:** Закрой окна терминалов или запуsti `stop.bat`

---

## 🆘 Проблемы?

### Ошибка "pip requires Rust"
Запусти:
```bash
install_step_by_step.bat
```
Покажет, какой пакет проблемный.

### Ошибка "Cannot connect to database"
Проверь `DATABASE_URL` в `.env`

### Frontend не открывается
1. Проверь что установлены зависимости: `cd client && npm install`
2. Запусти отдельно: `start_frontend.bat`

---

**Готово! Запускай `start.bat` и работай! 🎉**
