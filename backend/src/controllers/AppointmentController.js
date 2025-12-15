const Appointment = require('../models/Appointment');
const Barber = require('../models/Barber');
const User = require('../models/User');
const NotificationService = require('../services/NotificationService');

class AppointmentController {
  static async create(req, res) {
    try {
      const userId = req.user.id;
      const { barberId, appointmentDate, appointmentTime, serviceType } = req.body;

      if (!barberId || !appointmentDate || !appointmentTime || !serviceType) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const appointment = await Appointment.create(
        userId,
        barberId,
        appointmentDate,
        appointmentTime,
        serviceType
      );

      // Obtener datos del barbero y cliente para notificaciones
      try {
        const barber = await Barber.findById(barberId);
        const customer = await User.findById(userId);

        if (barber && customer) {
          // Enviar notificaciones al barbero
          if (barber.email) {
            NotificationService.sendBarberEmailNotification(barber, appointment, customer);
          }
          if (barber.phone) {
            NotificationService.sendBarberWhatsAppNotification(barber, appointment, customer);
          }

          // Enviar notificaciones al cliente
          if (customer.email) {
            NotificationService.sendCustomerEmailNotification(customer, appointment, barber);
          }
          if (customer.phone) {
            NotificationService.sendCustomerWhatsAppNotification(customer, appointment, barber);
          }
        }
      } catch (notificationError) {
        console.error('Error sending notifications:', notificationError);
        // No fallar la cita si hay error en notificaciones
      }

      res.status(201).json({
        message: 'Appointment booked successfully',
        appointment,
      });
    } catch (error) {
      console.error('Create appointment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getMyAppointments(req, res) {
    try {
      const userId = req.user.id;
      const appointments = await Appointment.findByUserId(userId);

      res.json(appointments);
    } catch (error) {
      console.error('Get appointments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAppointmentById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      console.error('Get appointment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async cancelAppointment(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const appointment = await Appointment.findById(id);
      if (!appointment || appointment.user_id !== userId) {
        return res.status(403).json({ error: 'Not authorized to cancel this appointment' });
      }

      const cancelled = await Appointment.cancel(id);

      // Enviar notificación de cancelación al barbero
      try {
        const barber = await Barber.findById(appointment.barber_id);
        const customer = await User.findById(userId);

        if (barber && customer) {
          NotificationService.notifyCancellation(barber, appointment, customer);
        }
      } catch (notificationError) {
        console.error('Error sending cancellation notification:', notificationError);
      }

      res.json({
        message: 'Appointment cancelled successfully',
        appointment: cancelled,
      });
    } catch (error) {
      console.error('Cancel appointment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAvailableSlots(req, res) {
    try {
      const { barberId, date } = req.query;

      if (!barberId || !date) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const slots = await Appointment.getAvailableSlots(barberId, date);

      res.json(slots);
    } catch (error) {
      console.error('Get available slots error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getBarberAppointments(req, res) {
    try {
      const barberId = req.user.barber_id;

      if (!barberId) {
        return res.status(403).json({ error: 'User is not a barber' });
      }

      const appointments = await Appointment.findByBarberId(barberId);

      res.json(appointments);
    } catch (error) {
      console.error('Get barber appointments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateAppointmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const barberId = req.user.barber_id;

      if (!barberId) {
        return res.status(403).json({ error: 'Only barbers can update appointment status' });
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      if (appointment.barber_id !== barberId) {
        return res.status(403).json({ error: 'Not authorized to update this appointment' });
      }

      const updated = await Appointment.updateStatus(id, status);

      res.json({
        message: 'Appointment status updated successfully',
        appointment: updated,
      });
    } catch (error) {
      console.error('Update appointment status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AppointmentController;
