import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      menu: 'Menu',
      home: 'Home',
      products: 'Products',
      deals: 'Deals',
      dashboard: 'Dashboard',
      admin: 'Admin Panel',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      
      // Auth
      username: 'Username',
      password: 'Password',
      email: 'Email (optional)',
      telegram_id: 'Telegram ID (optional)',
      create_account: 'Create Account',
      have_account: 'Already have an account?',
      no_account: "Don't have an account?",
      
      // Products
      all_products: 'All Products',
      category: 'Category',
      price: 'Price',
      buy_now: 'Buy Now',
      view_details: 'View Details',
      
      // Deals
      my_deals: 'My Deals',
      deal_status: 'Status',
      pending: 'Pending',
      accepted: 'Accepted',
      payment_sent: 'Payment Sent',
      completed: 'Completed',
      rejected: 'Rejected',
      cancelled: 'Cancelled',
      
      // Deal Chat
      send_message: 'Send Message',
      type_message: 'Type a message...',
      steam_card_code: 'Steam Card Code',
      submit_payment: 'Submit Payment',
      accept_deal: 'Accept Deal',
      reject_deal: 'Reject Deal',
      complete_deal: 'Complete Deal',
      
      // Admin
      admin_panel: 'Admin Panel',
      users: 'Users',
      statistics: 'Statistics',
      manage_categories: 'Manage Categories',
      manage_products: 'Manage Products',
      ban_user: 'Ban User',
      unban_user: 'Unban User',
      
      // Common
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
  },
  ru: {
    translation: {
      // Navigation
      menu: 'Меню',
      home: 'Главная',
      products: 'Товары',
      deals: 'Сделки',
      dashboard: 'Личный кабинет',
      admin: 'Админ панель',
      logout: 'Выйти',
      login: 'Войти',
      register: 'Регистрация',
      
      // Auth
      username: 'Имя пользователя',
      password: 'Пароль',
      email: 'Email (необязательно)',
      telegram_id: 'Telegram ID (необязательно)',
      create_account: 'Создать аккаунт',
      have_account: 'Уже есть аккаунт?',
      no_account: 'Нет аккаунта?',
      
      // Products
      all_products: 'Все товары',
      category: 'Категория',
      price: 'Цена',
      buy_now: 'Купить',
      view_details: 'Подробнее',
      
      // Deals
      my_deals: 'Мои сделки',
      deal_status: 'Статус',
      pending: 'Ожидание',
      accepted: 'Принято',
      payment_sent: 'Оплата отправлена',
      completed: 'Завершено',
      rejected: 'Отклонено',
      cancelled: 'Отменено',
      
      // Deal Chat
      send_message: 'Отправить сообщение',
      type_message: 'Введите сообщение...',
      steam_card_code: 'Код Steam карты',
      submit_payment: 'Отправить оплату',
      accept_deal: 'Принять сделку',
      reject_deal: 'Отклонить',
      complete_deal: 'Завершить сделку',
      
      // Admin
      admin_panel: 'Админ панель',
      users: 'Пользователи',
      statistics: 'Статистика',
      manage_categories: 'Управление категориями',
      manage_products: 'Управление товарами',
      ban_user: 'Забанить',
      unban_user: 'Разбанить',
      
      // Common
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      add: 'Добавить',
      search: 'Поиск',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
