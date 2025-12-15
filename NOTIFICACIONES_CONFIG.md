# 📧 Configuración de Notificaciones - Email y WhatsApp

## 📧 Configuración de Email (Gmail)

### Paso 1: Activar Gmail App Password
1. Ve a [Google Account](https://myaccount.google.com/)
2. Click en "Seguridad" en el menú izquierdo
3. Desplázate hasta "Contraseñas de aplicaciones"
4. Selecciona:
   - Device: Windows Computer (o tu dispositivo)
   - App: Mail
5. Google generará una contraseña de 16 caracteres
6. Copia esa contraseña

### Paso 2: Actualizar .env
```bash
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=lacontraseña_de_16_caracteres_de_google
```

**Ejemplo:**
```
EMAIL_USER=barbershop@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

## 💬 Configuración de WhatsApp (Twilio)

### Paso 1: Crear cuenta en Twilio
1. Ve a [Twilio.com](https://www.twilio.com/console)
2. Crea una cuenta gratuita (te dan $15 de crédito)
3. Verifica tu email y número de teléfono

### Paso 2: Obtener credenciales
1. En el dashboard, ve a "Account" → "API Keys & tokens"
2. Copia tu **Account SID**
3. Copia tu **Auth Token**

### Paso 3: Activar WhatsApp
1. En el sidebar, busca "Messaging" → "WhatsApp"
2. Haz click en "Get Started"
3. Twilio te asignará un número de WhatsApp (ej: +1 (415) 523-8886)

### Paso 4: Actualizar .env
```bash
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Ejemplo:**
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## ⚠️ Importante - Modo Sandbox (Pruebas)

Mientras estés en modo de prueba, **necesitas agregar tus números de teléfono a la lista blanca de Twilio**:

1. Ve a "Messaging" → "WhatsApp" → "Sandbox"
2. Verás un mensaje como: "Send 'join...' to +14155238886"
3. **Envía ese mensaje desde tu WhatsApp real**
4. Twilio confirmará que tu número está autorizado

Una vez que hayas hecho esto, podrás enviar mensajes a ese número de teléfono.

## 🧪 Probar las Notificaciones

### Prueba de Email:
1. Crea una cita en la aplicación
2. Deberías recibir un email de confirmación
3. Revisa tu carpeta de Spam si no lo ves

### Prueba de WhatsApp:
1. Asegúrate de haber seguido los pasos del Sandbox
2. Crea una cita
3. Deberías recibir un mensaje en WhatsApp

## 🔧 Solución de problemas

### Email no llega
- ✅ Verifica que EMAIL_USER y EMAIL_PASSWORD sean correctos
- ✅ Revisa la carpeta de Spam
- ✅ Asegúrate de haber creado la contraseña de app en Gmail

### WhatsApp no funciona
- ✅ Verifica que hayas enviado 'join...' a Twilio
- ✅ Comprueba que TWILIO_ACCOUNT_SID y TWILIO_AUTH_TOKEN sean correctos
- ✅ Asegúrate de que el número de teléfono en la BD esté correcto (con código de país)
- ✅ En modo sandbox, solo puedes enviar a números autorizados

### Formato de número de teléfono
Debe ser: `+1234567890` (código de país + número sin caracteres especiales)

## 📝 Ejemplo de .env completo
```
PORT=5000
JWT_SECRET=tu_jwt_secret_aqui
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_USER=barbershop@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop

# Twilio Configuration (Para WhatsApp)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## 🚀 Pasos para ir a Producción

Cuando estés listo para producción:

1. **Email**: Gmail funcionará igual, pero considera usar un servicio profesional como SendGrid o AWS SES

2. **WhatsApp**: 
   - Solicita acceso a la API de WhatsApp Business
   - Configura números de teléfono verificados
   - Obtén aprobación para tus templates de mensajes

---

¿Necesitas ayuda con la configuración? Avísame.
