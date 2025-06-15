# WeatherApp - Jordy Santamaria 🌤️

Una aplicación del clima en vivo que muestra información de diferentes países y zonas horarias. También incluye un listado de usuarios registrados.

---

## Requisitos Previos 🛠️

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu máquina:

* **Angular**: [Guía de Instalación](https://angular.dev/installation)
* **Node.js & npm**: [Descargar Node.js](https://nodejs.org/en/download/)
* **Git**: [Descargar Git](https://git-scm.com/)
* **MySQL**: [Descargar MySQL](https://www.mysql.com/downloads/)

---

## Instalación 🚀

Sigue estos pasos para configurar el proyecto localmente:

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/jordysantamaria94/weather-app](https://github.com/jordysantamaria94/weather-app)
cd weather-app
```

### 2. Instalar Dependencias de Node.js (Frontend y Backend)

Navega a la raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias tanto para el frontend como para el backend:

```bash
npm install
```

### 3. Configurar Variables de Entorno (Backend)

Crea un archivo .env en el directorio backend de tu proyecto copiando el archivo de ejemplo:

```bash
cp .env.example .env
```

Luego, edita el archivo .env con tus propias configuraciones:

```bash

PORT=3000

DATABASE_URL="mysql://user:password@host:port/database" # Ejemplo: mysql://root:password@localhost:3306/weather_app
JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY" # Genera una clave segura
WEATHER_API_KEY="YOUR_WEATHER_API_KEY" # Obtén una clave de tu proveedor de API de clima
```

### 4. Configurar la Base de Datos con Prisma 💾

El backend utiliza Prisma para la gestión de la base de datos. Necesitarás migrar tu esquema de Prisma a MySQL.

```bash
# Asegúrate de estar en el directorio raíz de tu backend (donde está el archivo schema.prisma)
npx prisma migrate dev --name init
```

### 5. Iniciar la Aplicación Frontend 🖥️

```bash
ng serve
```

### 5. Iniciar la Aplicación Backend 🌐

Inicia el servidor de desarrollo de Laravel:

```bash
npm run dev
```

### ¡Listo para Usar! 🎉
