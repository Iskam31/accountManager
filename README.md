<h1 align="center">Управление учетными записями <a href="https://github.com/Iskam31" target="_blank">by Iskam31</a> 
<img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="32"/></h1>
<h3 align="center">Vue.js 3 приложение для управления учетными записями с использованием современного стека технологий.</h3>

# 🚀 Технологии
- Vue.js 3 - Composition API
- TypeScript - строгая типизация
- Pinia - управление состоянием
- Bootstrap 5 - UI фреймворк
- Vite - сборка и dev-сервер
- Docker - контейнеризация

# 📋 Функциональность
Учетная запись состоит из:
- Метка - Необязательное поле (максимум 50 символов), ввод через ;
- Тип записи - Выпадающий список: LDAP или Локальная
- Логин - Обязательное поле (максимум 100 символов)
- Пароль - Обязательное только для типа "Локальная" (максимум 100 символов)

# 🛠 Установка и запуск
Локальная разработка:
```
# Клонирование репозитория
git clone <repository-url>
cd account-manager

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Preview production сборки
npm run preview
```
Запуск в Docker:
```
# Production сборка
docker-compose up --build

# Development режим (с hot reload)
docker-compose -f docker-compose.dev.yml up --build

# Только сборка образа
docker build -t account-manager .
```
# 📁 Структура проекта
```
src/
├── components/
│   └── AccountItem.vue      # Компонент учетной записи
├── stores/
│   └── accountStore.ts      # Pinia хранилище
├── types/
│   └── account.ts           # TypeScript типы
├── App.vue                  # Главный компонент
└── main.ts                  # Точка входа
```

# 🎯 Использование
1. Добавление учетной записи - Нажмите кнопку "Добавить учетную запись"
2. Заполнение полей:
   - Введите метки через точку с запятой: метка1; метка2
   - Выберите тип учетной записи
   - Заполните обязательные поля логин и пароль (для локальных записей)
3. Валидация - Происходит автоматически при потере фокуса
4. Удаление - Нажмите кнопку "Удалить" на нужной учетной записи

<h3 align="center"> Приложение доступно по адресу: <a href="http://localhost:3000" target="_blank"> http://localhost:3000 </a> после запуска </h3>
