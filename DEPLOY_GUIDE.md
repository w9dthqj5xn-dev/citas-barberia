# 🚀 Guía Completa de Despliegue a Netlify + Render

## **PASO 1: Preparar el repositorio**

### 1.1 Inicializar Git (si no está)
```bash
cd /Users/ing.carlosjimenez/Library/Mobile\ Documents/com~apple~CloudDocs/Proyectos/citas-barberia
git init
git add .
git commit -m "Initial commit: Barber Shop System"
```

### 1.2 Crear repositorio en GitHub
- Ve a github.com y crea un nuevo repositorio privado
- Nombre: `citas-barberia` (o el que prefieras)
- **NO inicialices con README, .gitignore, ni LICENSE**

### 1.3 Conectar con GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/citas-barberia.git
git branch -M main
git push -u origin main
```

---

## **PASO 2: Desplegar Backend en RENDER**

### 2.1 Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Registrate con GitHub
- Autoriza la conexión

### 2.2 Crear servicio web
1. Click en "New +" → "Web Service"
2. Selecciona tu repositorio `citas-barberia`
3. Configura:
   - **Name:** `barber-shop-api` (o el que prefieras)
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `node src/index.js`
   - **Plan:** Free

### 2.3 Agregar variables de entorno
En el panel de Render, ve a "Environment" y agrega:
```
PORT=5002
JWT_SECRET=tu_secreto_super_seguro_aqui_2025
NODE_ENV=production
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_app_gmail
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=xxx
```

### 2.4 Deploy
- Click en "Deploy"
- Espera a que diga "Live"
- Copia la URL: `https://barber-shop-api.onrender.com`

---

## **PASO 3: Desplegar Frontend en NETLIFY**

### 3.1 Crear cuenta en Netlify
- Ve a [netlify.com](https://netlify.com)
- Registrate con GitHub
- Autoriza la conexión

### 3.2 Crear nuevo sitio
1. Click en "Add new site" → "Import an existing project"
2. Selecciona GitHub
3. Elige repositorio `citas-barberia`
4. Configura:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`

### 3.3 Agregar variables de entorno
Antes de hacer deploy, agrega en "Site settings" → "Build & deploy" → "Environment":
```
REACT_APP_API_URL=https://barber-shop-api.onrender.com/api
```

### 3.4 Deploy
- Click en "Deploy"
- Espera a que termine
- Verás la URL: `https://tu-sitio.netlify.app`

---

## **PASO 4: Verificar que funciona**

1. Abre `https://tu-sitio.netlify.app`
2. Intenta loguearte con: `carlos@barber.com` / `barber123`
3. Accede a "Mi Panel"
4. Verifica que se cargan las citas

---

## **📝 Notas Importantes**

### URLS finales
- **Frontend:** `https://tu-sitio.netlify.app`
- **Backend API:** `https://barber-shop-api.onrender.com/api`

### Si tienes problemas:
1. Verifica que `REACT_APP_API_URL` está correcto
2. Comprueba que el backend está corriendo en Render
3. Mira los logs en Render si hay errores
4. Abre DevTools (F12) en navegador para ver errores

### Actualizar código
Simplemente haz push a GitHub:
```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```
Netlify y Render se redespliegan automáticamente.

---

## **🔒 Mantener las credenciales seguras**

**NUNCA** commits `.env` a GitHub. Las variables de entorno deben estar:
- En los paneles de Render y Netlify
- En un archivo `.env` local (ignorado por `.gitignore`)

---

¡Listo! Tu sitio estará en producción en 5-10 minutos. 🎉
