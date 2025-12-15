const { hashPassword } = require('./passwordUtils');
const { v4: uuidv4 } = require('uuid');

const seedAdminUser = async (db) => {
  try {
    const hashedPassword = await hashPassword('admin123');
    const id = uuidv4();
    
    const query = `
      INSERT OR IGNORE INTO users (id, email, password, name, phone, role, created_at)
      VALUES (?, ?, ?, ?, ?, 'admin', datetime('now'))
    `;
    
    db.run(query, [id, 'admin@barbershop.com', hashedPassword, 'Administrador', '555-0000'], (err) => {
      if (err) {
        console.error('Error creating admin user:', err);
      } else {
        console.log('Admin user created: admin@barbershop.com / admin123');
      }
    });
  } catch (error) {
    console.error('Error in seedAdminUser:', error);
  }
};

module.exports = seedAdminUser;
