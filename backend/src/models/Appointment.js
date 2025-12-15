const db = require('../utils/sqlite');
const { v4: uuidv4 } = require('uuid');

class Appointment {
  static async create(userId, barberId, appointmentDate, appointmentTime, serviceType) {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      
      const query = `
        INSERT INTO appointments (id, user_id, barber_id, appointment_date, appointment_time, service_type, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'confirmed', datetime('now'))
      `;
      
      db.run(query, [id, userId, barberId, appointmentDate, appointmentTime, serviceType], function(err) {
        if (err) reject(err);
        else resolve({ id, user_id: userId, barber_id: barberId, appointment_date: appointmentDate, appointment_time: appointmentTime, service_type: serviceType, status: 'confirmed' });
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT a.*, u.name as user_name, u.email as user_email, b.name as barber_name, b.specialty
        FROM appointments a
        JOIN users u ON a.user_id = u.id
        JOIN barbers b ON a.barber_id = b.id
        WHERE a.id = ?
      `;
      
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT a.*, b.name as barber_name, b.specialty
        FROM appointments a
        JOIN barbers b ON a.barber_id = b.id
        WHERE a.user_id = ?
        ORDER BY a.appointment_date DESC
      `;
      
      db.all(query, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static async findByBarberId(barberId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT a.*, u.name as user_name, u.email as user_email
        FROM appointments a
        JOIN users u ON a.user_id = u.id
        WHERE a.barber_id = ?
        ORDER BY a.appointment_date ASC
      `;
      
      db.all(query, [barberId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static async updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE appointments SET status = ?, updated_at = datetime('now')
        WHERE id = ?
      `;
      
      db.run(query, [status, id], function(err) {
        if (err) reject(err);
        else {
          Appointment.findById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  static async cancel(id) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE appointments SET status = 'cancelled', updated_at = datetime('now')
        WHERE id = ?
      `;
      
      db.run(query, [id], function(err) {
        if (err) reject(err);
        else {
          Appointment.findById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  static async getAvailableSlots(barberId, appointmentDate) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM barber_availability
        WHERE barber_id = ? AND available_date = ? AND is_available = 1
        ORDER BY start_time
      `;
      
      db.all(query, [barberId, appointmentDate], (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }
}

module.exports = Appointment;
