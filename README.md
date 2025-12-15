# Barber Shop Appointment System

Sistema completo de reserva de citas para barberías con:

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + CSS moderno
- **Backend**: Node.js + Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens)

## 📁 Estructura del Proyecto

```
citas-barberia/
├── frontend/                 # Aplicación React
│   ├── public/              # Archivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # Servicios API
│   │   ├── context/        # Context API para estado
│   │   ├── styles/         # Estilos CSS
│   │   ├── App.js          # Componente principal
│   │   └── index.js        # Entry point
│   ├── package.json        # Dependencias frontend
│   └── .env.example        # Variables de entorno
│
├── backend/                 # API Express
│   ├── src/
│   │   ├── routes/         # Rutas de la API
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── models/         # Modelos de datos
│   │   ├── middleware/     # Middlewares
│   │   ├── utils/          # Utilidades
│   │   ├── database/       # Configuración DB
│   │   └── index.js        # Servidor principal
│   ├── package.json        # Dependencias backend
│   └── .env.example        # Variables de entorno
│
└── docs/                    # Documentación

```

## ✨ Características

### 👤 Autenticación
- Registro de usuarios
- Login con email y contraseña
- JWT para seguridad
- Gestión de sesiones

### 💈 Gestión de Barberos
- Listado de barberos disponibles
- Perfil de cada barbero
- Especialidades
- Contacto directo

### 📅 Sistema de Citas
- Reserva de citas
- Selección de barbero
- Fecha y hora disponible
- Tipos de servicios
- Cancelación de citas

### 👤 Perfiles de Usuario
- Información personal
- Teléfono de contacto
- Historial de citas
- Gestión de datos

## 🚀 Instalación

### Requisitos Previos
- Node.js (v14+)
- PostgreSQL (v12+)
- npm o yarn

### Backend

1. Navega a la carpeta backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=barber_shop
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development
```

5. Inicia el servidor:
```bash
npm run dev
```

### Frontend

1. Navega a la carpeta frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Inicia la aplicación:
```bash
npm start
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/users/profile` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil

### Barberos
- `GET /api/barbers` - Listar todos los barberos
- `GET /api/barbers/:id` - Obtener barbero específico
- `POST /api/barbers` - Crear barbero (admin)
- `PUT /api/barbers/:id` - Actualizar barbero (admin)
- `DELETE /api/barbers/:id` - Desactivar barbero (admin)

### Citas
- `POST /api/appointments` - Crear cita
- `GET /api/appointments/my-appointments` - Mis citas
- `GET /api/appointments/:id` - Obtener cita específica
- `DELETE /api/appointments/:id` - Cancelar cita
- `GET /api/appointments/available-slots` - Horarios disponibles

## 🗄️ Base de Datos

### Tablas

**users**
- id (UUID)
- email (VARCHAR, único)
- password (VARCHAR)
- name (VARCHAR)
- phone (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**barbers**
- id (UUID)
- name (VARCHAR)
- specialty (VARCHAR)
- phone (VARCHAR)
- email (VARCHAR)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**appointments**
- id (UUID)
- user_id (FK)
- barber_id (FK)
- appointment_date (DATE)
- appointment_time (TIME)
- service_type (VARCHAR)
- status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**barber_availability**
- id (UUID)
- barber_id (FK)
- available_date (DATE)
- start_time (TIME)
- end_time (TIME)
- is_available (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## 📝 Licencia

MIT License - ver LICENSE para más detalles

## 👨‍💻 Desarrollo

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Para soporte o preguntas, contacta a: support@barbershop.com
