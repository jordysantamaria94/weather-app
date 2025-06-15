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
    **¡Importante!** Asegúrate de que tu archivo `.env` esté incluido en tu `.gitignore` para evitar subir tus credenciales a control de versiones.

### 3. Ejecutar Migraciones de la Base de Datos

Antes de que el backend pueda iniciarse y conectarse a la base de datos, necesitas ejecutar las migraciones de Prisma para configurar el esquema de la base de datos MySQL.

1.  **Levanta solo el servicio de la base de datos:**
    Abre tu terminal en la raíz del proyecto (`weather-app/`) y ejecuta:
    ```bash
    docker compose up -d db
    ```
    Permite unos segundos para que el contenedor de MySQL se inicialice completamente.

2.  **Ejecuta las migraciones de Prisma:**
    Navega al directorio `backend/` y ejecuta el comando de migración de Prisma:
    ```bash
    cd backend/
    npx prisma migrate dev --name init # 'init' puede ser un nombre de migración diferente si ya tienes una.
    cd .. # Vuelve a la raíz del proyecto
    ```
    Esto creará las tablas necesarias en tu base de datos Dockerizada.

### 4. Levantar la Aplicación Completa

Una vez que las migraciones de la base de datos se han ejecutado con éxito, puedes construir las imágenes de los servicios de Angular y Node.js, y levantar toda la aplicación:

* Desde la raíz del proyecto (`weather-app/`), ejecuta:
    ```bash
    docker compose up --build -d
    ```
    * `--build`: Fuerza la reconstrucción de las imágenes de Docker para el frontend y el backend, lo cual es esencial la primera vez o después de realizar cambios en el código o las dependencias.
    * `-d`: Ejecuta los contenedores en segundo plano (detached mode).

### 5. Acceso a la Aplicación

Una vez que todos los servicios estén levantados y corriendo:

* **Frontend (Angular):** Accede a la aplicación en tu navegador web en:
    [http://localhost:4200](http://localhost:4200)

* **Backend (Node.js/Express.js):** El backend estará escuchando peticiones en:
    [http://localhost:3000](http://localhost:3000) (Normalmente, el frontend se comunicará con este puerto internamente).

---

### 📚 Comandos Útiles de Docker Compose

Aquí tienes algunos comandos útiles para gestionar tu aplicación Dockerizada:

* **Ver el estado de los servicios:**
    ```bash
    docker compose ps
    ```

* **Ver los logs de un servicio específico (ej. `backend` o `frontend`):**
    ```bash
    docker compose logs backend
    docker compose logs frontend
    ```
    Para seguir los logs en tiempo real, añade `-f`: `docker compose logs -f backend`

* **Detener todos los servicios sin eliminarlos:**
    ```bash
    docker compose stop
    ```

* **Detener y eliminar los contenedores, pero mantener los volúmenes de datos (tu base de datos persistirá):**
    ```bash
    docker compose down
    ```

* **Detener y eliminar todos los contenedores, redes y volúmenes de datos (¡CUIDADO! Esto borrará tu base de datos y otros datos persistentes):**
    ```bash
    docker compose down -v
    ```

---