const { v4: uuidv4 } = require('uuid');

// Insertar barberos de ejemplo
const seedBarbers = (db) => {
  const barbers = [
    { id: uuidv4(), name: 'Carlos García', specialty: 'Corte clásico', phone: '555-0101', email: 'carlos@barber.com' },
    { id: uuidv4(), name: 'Juan Martinez', specialty: 'Diseño moderno', phone: '555-0102', email: 'juan@barber.com' },
  ];

  barbers.forEach(barber => {
    const query = `
      INSERT OR IGNORE INTO barbers (id, name, specialty, phone, email, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, 1, datetime('now'))
    `;
    
    db.run(query, [barber.id, barber.name, barber.specialty, barber.phone, barber.email], (err) => {
      if (err) console.error('Error inserting barber:', err);
      else console.log(`Barber ${barber.name} added`);
    });
  });
};

module.exports = seedBarbers;
