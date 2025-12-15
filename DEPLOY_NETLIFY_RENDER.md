# 🚀 Guía de Despliegue: Netlify + Render

## Resumen
- **Frontend**: Netlify (React) ✅
- **Backend**: Render (Node.js/Express + SQLite) ✅
- **Costo**: 100% Gratis

---

## PASO 1: Preparar Git y GitHub

```bash
# Inicializar git (si no lo has hecho)
git init
git add .
git commit -m "Preparado para deploy: Netlify + Render"
```

**Crear repositorio en GitHub:**
1. Ve a https://github.com/new
2. Nombre: `citas-barberia`
3. **Privado** o Público (tu eliges)
4. NO marques "Initialize with README"

```bash
# Conectar con GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/citas-barberia.git
git branch -M main
git push -u origin main
```

---

## PASO 2: Desplegar Backend en Render (Gratis)

### 2.1 Crear cuenta
1. Ve a https://render.com
2. Registrate con tu cuenta de GitHub
3. Autoriza Render

### 2.2 Crear Web Service
1. Click **"New +"** → **"Web Service"**
2. Conecta tu repositorio `citas-barberia`
3. Configuración:
   - **Name**: `barberia-api` (o lo que prefieras)
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
   - **Plan**: `Free` (sin tarjeta de crédito)

### 2.3 Variables de Entorno
En "Environment" agrega:

```
PORT=5002
JWT_SECRET=mi_secreto_super_seguro_2025_barberia
NODE_ENV=production
```

### 2.4 Deploy
- Click **"Create Web Service"**
- Espera 2-3 minutos
- Copia la URL: `https://barberia-api.onrender.com`

⚠️ **Importante**: El backend en Render Free se "duerme" después de 15 min de inactividad. La primera carga puede tardar 30-60 segundos.

---

## PASO 3: Desplegar Frontend en Netlify (Gratis)

### 3.1 Crear cuenta
1. Ve a https://www.netlify.com
2. Registrate con GitHub
3. Autoriza Netlify

### 3.2 Crear sitio
1. Click **"Add new site"** → **"Import an existing project"**
2. Selecciona **GitHub**
3. Elige tu repositorio `citas-barberia`
4. Configuración:
   - **Branch**: `main`
   - **Build settings** se detectan automáticamente por `netlify.toml`
   - Verifica que muestre:
     - Base directory: `frontend`
     - Build command: `npm install && npm run build`
     - Publish directory: `frontend/build`

### 3.3 Variables de Entorno
Antes de desplegar, en **"Site settings"** → **"Build & deploy"** → **"Environment"** agrega:

```
REACT_APP_API_URL=https://barberia-api.onrender.com/api
```

⚠️ **Reemplaza** `barberia-api` con el nombre que elegiste en Render.

### 3.4 Deploy
- Click **"Deploy site"**
- Espera 1-2 minutos
- Tu app estará en: `https://random-name-12345.netlify.app`

### 3.5 Cambiar nombre del sitio (opcional)
- Ve a **"Site settings"** → **"Site details"** → **"Change site name"**
- Elige algo como: `mi-barberia-app`
- URL final: `https://mi-barberia-app.netlify.app`

---

## PASO 4: Verificar que funciona

1. Abre tu sitio: `https://mi-barberia-app.netlify.app`
2. Registra un nuevo usuario
3. Inicia sesión
4. Prueba hacer una cita

---

## 📝 Usuarios de prueba (creados automáticamente)

**Admin:**
- Email: `carlos@barber.com`
- Password: `barber123`
- Rol: Administrador

**Barbero:**
- Email: `pedro@barber.com`
- Password: `barber123`
- Rol: Barbero

---

## 🔄 Actualizar la aplicación

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

- **Render** y **Netlify** detectarán los cambios automáticamente
- Se re-desplegarán en 2-3 minutos

---

## ⚙️ Configuración CORS (Ya configurado)

El backend ya tiene CORS habilitado para aceptar peticiones desde cualquier dominio. No necesitas configurar nada adicional.

---

## 🆘 Solución de problemas

### Frontend no se conecta al backend
1. Verifica que la variable `REACT_APP_API_URL` esté configurada correctamente
2. Debe terminar con `/api`
3. Re-despliega en Netlify después de cambiarla

### Backend tarda mucho en responder
- El plan gratuito de Render "duerme" el servidor
- Primera petición después de 15 min puede tardar 30-60 segundos
- Esto es normal en el plan free

### Error de CORS
- Verifica que el backend tenga `cors()` configurado
- Ya está configurado en este proyecto ✅

---

## 💡 Mejoras opcionales

1. **Dominio personalizado**: Conecta tu propio dominio en Netlify
2. **Base de datos PostgreSQL**: Migrar de SQLite a PostgreSQL (Render ofrece free tier)
3. **Notificaciones**: Configurar Twilio y SendGrid para WhatsApp/Email

---

## 🎉 ¡Listo!

Tu aplicación está en producción, trabajando 24/7 de forma gratuita.
