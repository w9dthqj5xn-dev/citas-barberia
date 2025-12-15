const { hashPassword } = require('./passwordUtils');
const { v4: uuidv4 } = require('uuid');

const seedBarberUsers = (db) => {
  return new Promise((resolve) => {
    db.all('SELECT id, name, email FROM barbers', (err, barbers) => {
      if (err || !barbers || barbers.length === 0) {
        console.log('✅ No barberos encontrados para seeding de usuarios');
        resolve();
        return;
      }

      let processed = 0;

      barbers.forEach((barber, index) => {
        db.get(
          'SELECT id FROM users WHERE barber_id = ?',
          [barber.id],
          (err, existingUser) => {
            if (!existingUser && !err) {
              // Usuario no existe, crearlo
              const defaultPassword = 'barber123';
              hashPassword(defaultPassword).then(hashedPassword => {
                const userId = uuidv4();
                const email = barber.email || `barbero_${barber.id.substring(0, 8)}@barbershop.com`;

                db.run(
                  `INSERT INTO users (id, email, password, name, phone, role, barber_id, created_at)
                   VALUES (?, ?, ?, ?, ?, 'barber', ?, datetime('now'))`,
                  [userId, email, hashedPassword, barber.name, barber.phone, barber.id],
                  (err) => {
                    processed++;
                    if (!err) {
                      console.log(`✅ Usuario barbero creado: ${email} / barber123`);
                    } else if (!err.message.includes('UNIQUE constraint failed')) {
                      console.error('❌ Error creating barber user:', err);
                    }
                    if (processed === barbers.length) {
                      resolve();
                    }
                  }
                );
              }).catch(err => {
                console.error('❌ Error hashing password:', err);
                processed++;
                if (processed === barbers.length) {
                  resolve();
                }
              });
            } else {
              processed++;
              if (processed === barbers.length) {
                resolve();
              }
            }
          }
        );
      });
    });
  });
};

module.exports = seedBarberUsers;
