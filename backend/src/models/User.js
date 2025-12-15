const db = require('../utils/sqlite');
const { hashPassword } = require('../utils/passwordUtils');
const { v4: uuidv4 } = require('uuid');

class User {
  static async create(email, password, name, phone) {
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await hashPassword(password);
        const id = uuidv4();
        
        const query = `
          INSERT INTO users (id, email, password, name, phone, role, created_at)
          VALUES (?, ?, ?, ?, ?, 'customer', datetime('now'))
        `;
        
        db.run(query, [id, email, hashedPassword, name, phone || null], function(err) {
          if (err) reject(err);
          else resolve({ id, email, name, phone, role: 'customer', created_at: new Date() });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.get(query, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, email, name, phone, created_at FROM users WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async update(id, name, phone) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE users SET name = ?, phone = ?, updated_at = datetime('now')
        WHERE id = ?
      `;
      
      db.run(query, [name, phone || null, id], function(err) {
        if (err) reject(err);
        else {
          User.findById(id).then(resolve).catch(reject);
        }
      });
    });
  }
}

module.exports = User;
