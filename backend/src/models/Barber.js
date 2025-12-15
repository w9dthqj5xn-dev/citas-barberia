const db = require('../utils/sqlite');
const { v4: uuidv4 } = require('uuid');

class Barber {
  static async create(name, specialty, phone, email) {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      
      const query = `
        INSERT INTO barbers (id, name, specialty, phone, email, is_active, created_at)
        VALUES (?, ?, ?, ?, ?, 1, datetime('now'))
      `;
      
      db.run(query, [id, name, specialty, phone || null, email || null], function(err) {
        if (err) reject(err);
        else resolve({ id, name, specialty, phone, email, is_active: 1, created_at: new Date() });
      });
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM barbers WHERE is_active = 1 ORDER BY name';
      db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM barbers WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async update(id, name, specialty, phone, email) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE barbers SET name = ?, specialty = ?, phone = ?, email = ?, updated_at = datetime('now')
        WHERE id = ?
      `;
      
      db.run(query, [name, specialty, phone || null, email || null, id], function(err) {
        if (err) reject(err);
        else {
          Barber.findById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  static async deactivate(id) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE barbers SET is_active = 0, updated_at = datetime('now')
        WHERE id = ?
      `;
      
      db.run(query, [id], function(err) {
        if (err) reject(err);
        else {
          Barber.findById(id).then(resolve).catch(reject);
        }
      });
    });
  }
}

module.exports = Barber;
