# 🏨 Yuta-Yuttari - Sistema de Reservas Hoteleras

Sistema integral de gestión y reservas hoteleras desarrollado con arquitectura moderna full-stack, diseñado para optimizar la administración de hospedajes y mejorar la experiencia del usuario.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Scripts Disponibles](#-scripts-disponibles)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

### Funcionalidades del Sistema

- 🔐 **Autenticación y Autorización**
  - Registro de usuarios con verificación por email
  - Login con JWT (JSON Web Tokens)
  - Recuperación de contraseña
  - Roles y permisos (Admin, Usuario, Recepcionista)

- 🛏️ **Gestión de Habitaciones**
  - CRUD completo de habitaciones
  - Verificación de disponibilidad en tiempo real
  - Categorización por tipos (Simple, Doble, Suite, etc.)
  - Gestión de precios y características

- 📅 **Sistema de Reservas**
  - Búsqueda de habitaciones disponibles por fechas
  - Proceso de reserva paso a paso (Wizard)
  - Gestión de servicios adicionales
  - Historial de reservas
  - Cancelación y modificación de reservas

- 📧 **Notificaciones por Email**
  - Confirmación de registro
  - Verificación de cuenta
  - Confirmación de reserva
  - Recordatorios automáticos

- 👥 **Gestión de Usuarios**
  - Panel de administración
  - Perfiles de usuario
  - Gestión de clientes

## 🚀 Tecnologías

### Backend
- **Framework:** NestJS 10.x
- **ORM:** TypeORM
- **Base de Datos:** MariaDB 10.x
- **Autenticación:** Passport.js + JWT
- **Validación:** class-validator & class-transformer
- **Email:** Nodemailer
- **Lenguaje:** TypeScript 5.x

### Frontend
- **Framework:** Next.js 14.x
- **UI Framework:** React 18.x
- **UI Library:** Material-UI (MUI) v5
- **Estado:** React Context API / Zustand
- **HTTP Client:** Axios
- **Formularios:** React Hook Form + Yup
- **Lenguaje:** TypeScript 5.x

### DevOps & Herramientas
- **Control de Versiones:** Git
- **Gestor de Paquetes:** npm/yarn
- **Linter:** ESLint
- **Formateador:** Prettier

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js:** >= 18.x
- **npm:** >= 9.x o **yarn:** >= 1.22.x
- **MariaDB:** >= 10.6
- **Git:** >= 2.x

## 🔧 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/yuta-yuttari.git
cd yuta-yuttari
```

### 2. Instalar Dependencias del Backend
```bash
cd backend
npm install
```

### 3. Instalar Dependencias del Frontend
```bash
cd ../frontend
npm install
```

## ⚙️ Configuración

### Backend - Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/`:
```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=yuta_yuttari

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRATION=7d

# Email - Nodemailer (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASSWORD=tu_contraseña_de_aplicacion
MAIL_FROM="Yuta-Yuttari <noreply@yutayuttari.com>"

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000

# Verificación de Email
EMAIL_VERIFICATION_TOKEN_EXPIRY=24h
```

**Nota:** Para Gmail, necesitas generar una "Contraseña de Aplicación" en tu cuenta de Google.

### Frontend - Variables de Entorno

Crea un archivo `.env.local` en la carpeta `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Yuta-Yuttari"
```

### Base de Datos

1. Crear la base de datos:
```sql
CREATE DATABASE yuta_yuttari CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Ejecutar migraciones (desde la carpeta backend):
```bash
npm run migration:run
```

## 📁 Estructura del Proyecto
```
yuta-yuttari/
│
├── backend/                      # Servidor NestJS
│   ├── src/
│   │   ├── auth/                # Módulo de autenticación
│   │   │   ├── decorators/      # Decoradores personalizados
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── guards/          # Guards de autenticación
│   │   │   ├── strategies/      # Estrategias Passport
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── users/               # Módulo de usuarios
│   │   │   ├── entities/        # Entidad User
│   │   │   ├── dto/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── rooms/               # Módulo de habitaciones
│   │   │   ├── entities/        # Entidad Room
│   │   │   ├── dto/
│   │   │   ├── rooms.controller.ts
│   │   │   ├── rooms.service.ts
│   │   │   └── rooms.module.ts
│   │   │
│   │   ├── reservations/        # Módulo de reservas
│   │   │   ├── entities/        # Entidades Reservation, ReservationService
│   │   │   ├── dto/
│   │   │   ├── reservations.controller.ts
│   │   │   ├── reservations.service.ts
│   │   │   └── reservations.module.ts
│   │   │
│   │   ├── services/            # Módulo de servicios adicionales
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   └── services.module.ts
│   │   │
│   │   ├── mail/                # Módulo de correo (Nodemailer)
│   │   │   ├── templates/       # Plantillas HTML de emails
│   │   │   ├── mail.service.ts
│   │   │   └── mail.module.ts
│   │   │
│   │   ├── common/              # Utilidades compartidas
│   │   │   ├── filters/         # Exception filters
│   │   │   ├── interceptors/    # Interceptors
│   │   │   └── pipes/           # Pipes personalizados
│   │   │
│   │   ├── config/              # Configuraciones
│   │   │   ├── database.config.ts
│   │   │   └── jwt.config.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/                    # Tests
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # Aplicación Next.js
│   ├── src/
│   │   ├── app/                 # App Router de Next.js
│   │   │   ├── (auth)/          # Grupo de rutas de autenticación
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/       # Panel de usuario
│   │   │   ├── reservations/    # Reservas
│   │   │   ├── rooms/           # Habitaciones
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── layout/          # Layout components
│   │   │   ├── forms/           # Componentes de formularios
│   │   │   ├── cards/           # Cards
│   │   │   └── common/          # Componentes comunes
│   │   │
│   │   ├── services/            # Servicios API
│   │   │   ├── api.ts           # Configuración Axios
│   │   │   ├── auth.service.ts
│   │   │   ├── rooms.service.ts
│   │   │   └── reservations.service.ts
│   │   │
│   │   ├── context/             # Context API
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── hooks/               # Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useForm.ts
│   │   │
│   │   ├── types/               # TypeScript Types
│   │   │   ├── user.types.ts
│   │   │   ├── room.types.ts
│   │   │   └── reservation.types.ts
│   │   │
│   │   ├── utils/               # Utilidades
│   │   │   ├── validators.ts
│   │   │   └── formatters.ts
│   │   │
│   │   └── theme/               # Tema Material-UI
│   │       └── theme.ts
│   │
│   ├── public/                  # Archivos estáticos
│   ├── .env.local
│   ├── .env.example
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                        # Documentación adicional
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT.md
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🎯 Uso

### Modo Desarrollo

#### 1. Iniciar el Backend
```bash
cd backend
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

#### 2. Iniciar el Frontend
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3001`

### Modo Producción

#### Backend
```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend
```bash
cd frontend
npm run build
npm run start
```

## 📡 API Endpoints

### Autenticación
```
POST   /auth/register           # Registrar nuevo usuario
POST   /auth/login              # Iniciar sesión
GET    /auth/verify-email/:token # Verificar email
POST   /auth/forgot-password    # Solicitar recuperación
POST   /auth/reset-password     # Restablecer contraseña
GET    /auth/profile            # Obtener perfil (requiere JWT)
```

### Usuarios
```
GET    /users                   # Listar usuarios (Admin)
GET    /users/:id               # Obtener usuario
PUT    /users/:id               # Actualizar usuario
DELETE /users/:id               # Eliminar usuario (Admin)
```

### Habitaciones
```
GET    /rooms                   # Listar habitaciones
GET    /rooms/:id               # Obtener habitación
POST   /rooms                   # Crear habitación (Admin)
PUT    /rooms/:id               # Actualizar habitación (Admin)
DELETE /rooms/:id               # Eliminar habitación (Admin)
GET    /rooms/available         # Buscar disponibilidad
```

### Reservas
```
GET    /reservations            # Listar reservas del usuario
GET    /reservations/:id        # Obtener reserva
POST   /reservations            # Crear reserva
PUT    /reservations/:id        # Actualizar reserva
DELETE /reservations/:id        # Cancelar reserva
GET    /reservations/history    # Historial de reservas
```

### Servicios
```
GET    /services                # Listar servicios disponibles
GET    /services/:id            # Obtener servicio
POST   /services                # Crear servicio (Admin)
PUT    /services/:id            # Actualizar servicio (Admin)
DELETE /services/:id            # Eliminar servicio (Admin)
```

## 🛠️ Scripts Disponibles

### Backend
```bash
npm run start          # Iniciar en modo producción
npm run start:dev      # Iniciar en modo desarrollo
npm run start:debug    # Iniciar en modo debug
npm run build          # Compilar proyecto
npm run test           # Ejecutar tests
npm run test:watch     # Tests en modo watch
npm run test:cov       # Cobertura de tests
npm run lint           # Ejecutar ESLint
npm run format         # Formatear código con Prettier
npm run migration:generate  # Generar migración
npm run migration:run       # Ejecutar migraciones
npm run migration:revert    # Revertir última migración
```

### Frontend
```bash
npm run dev            # Iniciar desarrollo
npm run build          # Compilar para producción
npm run start          # Iniciar producción
npm run lint           # Ejecutar ESLint
npm run format         # Formatear código
npm run type-check     # Verificar tipos TypeScript
```

## 🗃️ Base de Datos

### Entidades Principales

- **User:** Usuarios del sistema
- **Room:** Habitaciones del hotel
- **Reservation:** Reservas realizadas
- **Service:** Servicios adicionales
- **ReservationService:** Tabla intermedia reservas-servicios

### Relaciones
```
User 1:N Reservation
Room 1:N Reservation
Reservation N:M Service (a través de ReservationService)
```

## 🔒 Seguridad

- Autenticación basada en JWT
- Contraseñas hasheadas con bcrypt
- Validación de datos con class-validator
- CORS configurado
- Protección contra inyección SQL (TypeORM)
- Sanitización de inputs

## 🧪 Testing
```bash
# Backend
cd backend
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Cobertura

# Frontend
cd frontend
npm run test              # Unit tests con Jest
npm run test:watch        # Tests en modo watch
```

## 📚 Documentación Adicional

- [Guía de Arquitectura](docs/ARCHITECTURE.md)
- [Documentación de API](docs/API.md)
- [Guía de Desarrollo](docs/DEVELOPMENT.md)
- [Guía de Despliegue](docs/DEPLOYMENT.md)
# Diccionario de Datos – Proyecto Yuta-Yuttari

## 1. Introducción

El diccionario de datos describe de manera detallada las entidades, atributos, relaciones y reglas de negocio del sistema **Yuta-Yuttari**, una aplicación de gestión de hoteles que incluye módulos de usuarios, hoteles, habitaciones, reservas y pagos. Este documento sirve como referencia para desarrolladores, analistas y usuarios, asegurando consistencia en el manejo de la información.

---

## 2. Tablas y Entidades Principales

### 2.1 Tabla: `users` (Usuarios)

**Descripción:** Almacena la información de los usuarios del sistema, incluyendo credenciales de acceso y datos de contacto.

| Campo | Tipo de Dato | Longitud | Restricciones | Descripción Funcional |
|-------|--------------|----------|---------------|----------------------|
| `id` | VARCHAR | 36 | PK, NOT NULL | Identificador único del usuario (UUID) |
| `name` | VARCHAR | 100 | NOT NULL | Nombre completo del usuario |
| `password` | VARCHAR | 255 | NOT NULL | Contraseña encriptada con bcrypt |
| `email` | VARCHAR | 100 | UNIQUE, NOT NULL | Correo electrónico del usuario |
| `phone` | VARCHAR | 20 | NULL | Número de celular del usuario |
| `role` | ENUM | - | NOT NULL | Rol del usuario: `USER`, `ADMIN` |
| `created_at` | DATETIME | 6 | DEFAULT CURRENT_TIMESTAMP | Fecha y hora de creación del registro |
| `updated_at` | DATETIME | 6 | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Fecha y hora de última actualización |

**Índices:**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `email`

**Relaciones:**
- Un usuario puede tener múltiples reservas (1:N con `reservations`)

---

### 2.2 Tabla: `hotels` (Hoteles)

**Descripción:** [Agregar descripción]

| Campo | Tipo de Dato | Longitud | Restricciones | Descripción Funcional |
|-------|--------------|----------|---------------|----------------------|
| ... | ... | ... | ... | ... |

---

### 2.3 Tabla: `rooms` (Habitaciones)

**Descripción:** [Agregar descripción]

| Campo | Tipo de Dato | Longitud | Restricciones | Descripción Funcional |
|-------|--------------|----------|---------------|----------------------|
| ... | ... | ... | ... | ... |

---

### 2.4 Tabla: `reservations` (Reservas)

**Descripción:** [Agregar descripción]

| Campo | Tipo de Dato | Longitud | Restricciones | Descripción Funcional |
|-------|--------------|----------|---------------|----------------------|
| ... | ... | ... | ... | ... |

---

### 2.5 Tabla: `payments` (Pagos)

**Descripción:** [Agregar descripción]

| Campo | Tipo de Dato | Longitud | Restricciones | Descripción Funcional |
|-------|--------------|----------|---------------|----------------------|
| ... | ... | ... | ... | ... |

---

## 3. Observaciones y Reglas de Negocio

### 3.1 Seguridad
- Las contraseñas en `users.password` se almacenan encriptadas utilizando **bcrypt** con un salt rounds de 10.
- Los tokens JWT tienen una expiración de 7 días por defecto.
- Se requiere verificación de email antes de activar completamente una cuenta.

### 3.2 Flujo de Reservas
- El campo `status` en `reservations` controla el flujo de negocio del sistema:
  - `pending` → Reserva creada pero pendiente de confirmación
  - `confirmed` → Reserva confirmada y pago procesado
  - `cancelled` → Reserva cancelada por el usuario o administrador
  - `completed` → Reserva finalizada (check-out realizado)

### 3.3 Roles y Permisos
- **ADMIN**: 
  - Puede crear, editar y eliminar hoteles
  - Gestión completa de habitaciones
  - Ver todas las reservas del sistema
  - Gestión de usuarios
- **USER**: 
  - Puede crear reservas
  - Ver y gestionar solo sus propias reservas
  - Actualizar su perfil personal

### 3.4 Validaciones
- El email debe tener formato válido y ser único en el sistema
- Los números de teléfono deben tener entre 10 y 20 caracteres
- Las fechas de check-in deben ser anteriores a las de check-out
- No se permiten reservas en habitaciones ya ocupadas en las mismas fechas

---

## 4. Diagrama de Relaciones (ER)
```
users (1) ──────< (N) reservations
hotels (1) ──────< (N) rooms
rooms (1) ──────< (N) reservations
reservations (1) ──────< (N) payments
```

---

## 5. Tipos de Datos Utilizados

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| VARCHAR | Cadena de texto de longitud variable | "Juan Pérez" |
| DATETIME | Fecha y hora | 2024-12-13 15:30:00 |
| ENUM | Lista predefinida de valores | "USER", "ADMIN" |
| DECIMAL | Números decimales | 150.50 |
| INT | Números enteros | 1, 2, 3 |
| UUID | Identificador único universal | "a1b2c3d4-e5f6-..." |

---

## 6. Convenciones de Nomenclatura

- **Tablas**: Plural, snake_case en minúsculas (`users`, `reservations`)
- **Campos**: snake_case en minúsculas (`created_at`, `updated_at`)
- **Claves primarias**: Siempre llamadas `id`
- **Claves foráneas**: `nombre_tabla_id` (ej: `user_id`, `hotel_id`)
- **Timestamps**: `created_at` y `updated_at` en todas las tablas

---

## 7. Versionamiento

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2024-12-13 | Pastuzan | Creación inicial del diccionario |

---

## 8. Conclusión

Este diccionario de datos proporciona una visión completa de la estructura de información del sistema **Yuta-Yuttari**, asegurando claridad en el diseño, desarrollo y mantenimiento. Es un **documento vivo** que debe actualizarse conforme se agreguen nuevas entidades o reglas de negocio.

---

## 9. Referencias

- [Documentación de TypeORM](https://typeorm.io/)
- [Guía de Arquitectura del Proyecto](./ARCHITECTURE.md)
- [Documentación de API](./API.md)

---

**Nota:** Este documento debe ser revisado y actualizado cada vez que se realicen cambios en el esquema de la base de datos.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits
```
Add: Nueva característica
Fix: Corrección de bug
Update: Actualización de funcionalidad
Remove: Eliminación de código
Docs: Cambios en documentación
Style: Cambios de formato
Refactor: Refactorización de código
Test: Añadir o modificar tests
```

## 👨‍💻 Autor

**Estudiantes Uniputumayo**
- Institucion Universitaria del putumayo(Uniputumayo)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- NestJS Team
- Next.js Team
- Material-UI Team
- Comunidad de código abierto

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!

**Desarrollado con ❤️ para la gestión hotelera moderna**