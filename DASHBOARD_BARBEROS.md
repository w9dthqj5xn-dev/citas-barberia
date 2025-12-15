# 📊 Dashboard de Barberos - Guía Rápida

## 👨‍💼 Cuentas de Barberos Disponibles

Cada barbero tiene una cuenta automática creada. Las credenciales son:

| Barbero | Email | Contraseña |
|---------|-------|-----------|
| Carlos García | `carlos@barber.com` | `carlosgarcia123` |
| Juan Martinez | `juan@barber.com` | `juanmartinez123` |
| Rafael Sánchez | `rafael@barber.com` | `rafaelsánchez123` |
| Miguel López | `miguel@barber.com` | `miguellópez123` |

## 🎯 Cómo acceder al Dashboard

1. **Ve a** http://localhost:3000
2. **Haz clic en** "Iniciar Sesión"
3. **Ingresa las credenciales** de cualquier barbero
4. **¡Listo!** Verás el panel **"📊 Mi Panel"** en la navegación

## 📋 Funcionalidades del Dashboard

### ✅ Ver Citas
- Todas las citas asignadas al barbero
- Filtrar por estado:
  - **Todas** - Ver todas las citas
  - **Confirmadas** - Citas esperando ser completadas
  - **Completadas** - Citas finalizadas
  - **Canceladas** - Citas canceladas

### ✏️ Gestionar Citas
Desde el dashboard, cada barbero puede:

1. **Marcar como Completada**
   - Cambia el estado a "Completada"
   - Se actualiza en tiempo real

2. **Cancelar Cita**
   - Cancela la cita si es necesario
   - El cliente recibe notificación

## 🔄 Auto-actualizarse

El dashboard se actualiza automáticamente cada 30 segundos para ver nuevas citas en tiempo real.

## 📧 Notificaciones

Los barberos reciben:
- ✉️ **Email** cuando se agenda una nueva cita
- 💬 **WhatsApp** (cuando esté configurado)

## 🧪 Probar con una Cita

1. **Crea una cuenta de cliente** (cualquier email diferente)
2. **Inicia sesión** como cliente
3. **Reserva una cita** con uno de los barberos
4. **Inicia sesión** como ese barbero
5. **Verás la nueva cita** en el dashboard

---

## ⚙️ Roles en el Sistema

| Rol | Acceso | Descripción |
|-----|--------|-----------|
| **Customer** | Reservar, ver sus citas | Clientes de la barbería |
| **Barber** | Dashboard, gestionar sus citas | Barberos |
| **Admin** | Gestionar barberos | Administrador (admin@barbershop.com) |

## 🚀 Próximas Mejoras

- [ ] Estadísticas diarias/mensuales
- [ ] Disponibilidad personalizada de barberos
- [ ] Valoraciones de clientes
- [ ] Integración con WhatsApp (cuando tengas credenciales Twilio)

---

¿Necesitas ayuda? Avísame.
