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

------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Cómo ejecutar la aplicación con Docker Compose

Para levantar y ejecutar la aplicación completa utilizando Docker Compose, sigue los siguientes pasos:

### 1. Requisitos

Asegúrate de tener Docker Desktop (para Windows y macOS) o Docker Engine y Docker Compose CLI (para Linux) instalados en tu sistema. Puedes descargarlos desde la [página oficial de Docker](https://www.docker.com/products/docker-desktop/).

### 2. Configuración de Variables de Entorno

La aplicación utiliza variables de entorno para configurar las credenciales de la base de datos y las claves de API.

* Crea un archivo llamado `.env` en la **raíz de este proyecto** (al mismo nivel que `docker-compose.yml`).
* Copia el contenido del siguiente ejemplo y rellena tus propias credenciales seguras y claves de API.

    ```dotenv
    # .env (Copia este contenido y rellena tus valores)

    # Variables para la base de datos MySQL
    MYSQL_ROOT_PASSWORD=tu_contraseña_root_segura
    MYSQL_DATABASE=weather_app_db
    MYSQL_USER=weather_user
    MYSQL_PASSWORD=tu_contraseña_usuario_bd_segura

    # Clave secreta para JWT (JSON Web Tokens) en el backend
    JWT_SECRET=tu_super_clave_secreta_jwt_aqui

    # Clave de la API de clima (ej. OpenWeatherMap, AccuWeather, etc.)
    WEATHER_API_KEY=tu_clave_api_clima_aqui
    ```

### 3. Ejecutar Migraciones de la Base de Datos

Antes de que el backend pueda iniciarse y conectarse a la base de datos, necesitas ejecutar las migraciones de Prisma para configurar el esquema de la base de datos MySQL.

1.  **Levanta solo el servicio de la base de datos:**
    Abre tu terminal en la raíz del proyecto (`weather-app/`) y ejecuta:
    ```bash
    docker compose up -d db
    ```

2.  **Ejecuta las migraciones de Prisma:**
    Navega al directorio `backend/` y ejecuta el comando de migración de Prisma:
    ```bash
    cd backend/
    npx prisma migrate dev --name init
    cd .. # Vuelve a la raíz del proyecto
    ```

### 4. Levantar la Aplicación Completa

Una vez que las migraciones de la base de datos se han ejecutado con éxito, puedes construir las imágenes de los servicios de Angular y Node.js, y levantar toda la aplicación:

* Desde la raíz del proyecto (`weather-app/`), ejecuta:
    ```bash
    docker compose up --build -d
    ```

### 5. Acceso a la Aplicación

* **Frontend (Angular):** Accede a la aplicación en tu navegador web en:
    [http://localhost:4200](http://localhost:4200)

* **Backend (Node.js/Express.js):** El backend estará escuchando peticiones en:
    [http://localhost:3000](http://localhost:3000)