const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Configuración de Email (usando Gmail como ejemplo)
// En producción, usar variables de entorno
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tu_email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'tu_contraseña_app'
  }
});

// Configuración de WhatsApp con Twilio (opcional)
let twilioClient = null;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155552671';

// Solo inicializar Twilio si tenemos credenciales válidas
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  } catch (err) {
    console.warn('⚠️ Twilio no configurado - notificaciones por WhatsApp deshabilitadas');
  }
}

class NotificationService {
  /**
   * Enviar notificación de cita al barbero por Email
   */
  static async sendBarberEmailNotification(barber, appointment, customer) {
    try {
      const emailBody = `
        <h2>¡Nueva Cita Asignada!</h2>
        <p><strong>Cliente:</strong> ${customer.name}</p>
        <p><strong>Fecha:</strong> ${appointment.appointment_date}</p>
        <p><strong>Hora:</strong> ${appointment.appointment_time}</p>
        <p><strong>Servicio:</strong> ${this.getServiceName(appointment.service_type)}</p>
        <p><strong>Teléfono del cliente:</strong> ${customer.phone || 'No proporcionado'}</p>
        <hr>
        <p>Accede al panel de barberos para ver más detalles.</p>
      `;

      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER || 'barber-shop@example.com',
        to: barber.email,
        subject: `📅 Nueva Cita - ${customer.name} a las ${appointment.appointment_time}`,
        html: emailBody
      });

      console.log(`✅ Email enviado a barbero: ${barber.email}`);
      return true;
    } catch (error) {
      console.error('❌ Error enviando email al barbero:', error);
      return false;
    }
  }

  /**
   * Enviar notificación de cita al barbero por WhatsApp
   */
  static async sendBarberWhatsAppNotification(barber, appointment, customer) {
    try {
      if (!twilioClient) {
        console.log('⚠️ Twilio no está configurado - omitiendo envío de WhatsApp');
        return false;
      }

      // Formatear número con código de país (ej: +34123456789)
      const phoneNumber = this.formatPhoneNumber(barber.phone);
      
      const message = `
📅 *NUEVA CITA*
━━━━━━━━━━━━━━
👤 Cliente: ${customer.name}
📞 Teléfono: ${customer.phone || 'No proporcionado'}
📅 Fecha: ${appointment.appointment_date}
🕐 Hora: ${appointment.appointment_time}
✂️ Servicio: ${this.getServiceName(appointment.service_type)}
━━━━━━━━━━━━━━
Accede al panel de barberos para confirmar.
      `.trim();

      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${phoneNumber}`,
        body: message
      });

      console.log(`✅ WhatsApp enviado a barbero: ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('❌ Error enviando WhatsApp al barbero:', error);
      return false;
    }
  }

  /**
   * Enviar notificación de cita al cliente por Email
   */
  static async sendCustomerEmailNotification(customer, appointment, barber) {
    try {
      const emailBody = `
        <h2>¡Tu Cita Confirmada!</h2>
        <p>Hola <strong>${customer.name}</strong>,</p>
        <p>Tu cita ha sido confirmada con éxito.</p>
        <hr>
        <p><strong>Barbero:</strong> ${barber.name}</p>
        <p><strong>Especialidad:</strong> ${barber.specialty}</p>
        <p><strong>Fecha:</strong> ${appointment.appointment_date}</p>
        <p><strong>Hora:</strong> ${appointment.appointment_time}</p>
        <p><strong>Servicio:</strong> ${this.getServiceName(appointment.service_type)}</p>
        <hr>
        <p>¡Te esperamos! Llega 5 minutos antes de tu cita.</p>
      `;

      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER || 'barber-shop@example.com',
        to: customer.email,
        subject: `✅ Cita Confirmada - ${appointment.appointment_date} a las ${appointment.appointment_time}`,
        html: emailBody
      });

      console.log(`✅ Email de confirmación enviado a cliente: ${customer.email}`);
      return true;
    } catch (error) {
      console.error('❌ Error enviando email al cliente:', error);
      return false;
    }
  }

  /**
   * Enviar notificación de cita al cliente por WhatsApp
   */
  static async sendCustomerWhatsAppNotification(customer, appointment, barber) {
    try {
      if (!twilioClient) {
        console.log('⚠️ Twilio no está configurado - omitiendo envío de WhatsApp');
        return false;
      }

      const phoneNumber = this.formatPhoneNumber(customer.phone);
      
      const message = `
✅ *CITA CONFIRMADA*
━━━━━━━━━━━━━━
👨‍💼 Barbero: ${barber.name}
✂️ Especialidad: ${barber.specialty}
📅 Fecha: ${appointment.appointment_date}
🕐 Hora: ${appointment.appointment_time}
💈 Servicio: ${this.getServiceName(appointment.service_type)}
━━━━━━━━━━━━━━
¡Te esperamos! Llega 5 minutos antes.
      `.trim();

      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${phoneNumber}`,
        body: message
      });

      console.log(`✅ WhatsApp de confirmación enviado a cliente: ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('❌ Error enviando WhatsApp al cliente:', error);
      return false;
    }
  }

  /**
   * Utilidad: Formatear nombre del servicio
   */
  static getServiceName(serviceType) {
    const services = {
      'corte': 'Corte de Cabello',
      'afeitado': 'Afeitado',
      'peinado': 'Peinado',
      'completo': 'Servicio Completo'
    };
    return services[serviceType] || serviceType;
  }

  /**
   * Utilidad: Formatear número de teléfono
   */
  static formatPhoneNumber(phone) {
    // Remover caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Si no tiene código de país, añadir +1 (o tu código)
    if (cleaned.length === 10) {
      return `+1${cleaned}`; // Cambiar según tu país
    } else if (!cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }
    return phone;
  }

  /**
   * Enviar notificación de cancelación al barbero
   */
  static async notifyCancellation(barber, appointment, customer) {
    try {
      const subject = `❌ Cita Cancelada - ${customer.name}`;
      const message = `
⚠️ *CITA CANCELADA*
━━━━━━━━━━━━━━
👤 Cliente: ${customer.name}
📅 Fecha: ${appointment.appointment_date}
🕐 Hora: ${appointment.appointment_time}
━━━━━━━━━━━━━━
      `.trim();

      // Email
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER || 'barber-shop@example.com',
        to: barber.email,
        subject: subject,
        html: `<h2>${subject}</h2><p>${message.replace(/\n/g, '<br>')}</p>`
      });

      // WhatsApp (opcional)
      if (twilioClient) {
        const phoneNumber = this.formatPhoneNumber(barber.phone);
        await twilioClient.messages.create({
          from: TWILIO_WHATSAPP_NUMBER,
          to: `whatsapp:${phoneNumber}`,
          body: message
        });
      }

      console.log(`✅ Notificación de cancelación enviada a ${barber.email}`);
      return true;
    } catch (error) {
      console.error('❌ Error notificando cancelación:', error);
      return false;
    }
  }
}

module.exports = NotificationService;
