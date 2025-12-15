const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const seedBarbers = require('./seedBarbers');
const seedAdminUser = require('./seedAdminUser');
const seedBarberUsers = require('./seedBarberUsers');

const dbPath = path.join(process.cwd(), 'barber_shop.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

const initializeDatabase = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'customer',
    barber_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, function(err) {
    if (err) {
      console.error('❌ Error creating users table:', err);
      return;
    }
    console.log('✅ Users table created/verified');
    
    db.run(`CREATE TABLE IF NOT EXISTS barbers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, function(err) {
      if (err) {
        console.error('❌ Error creating barbers table:', err);
        return;
      }
      console.log('✅ Barbers table created/verified');
      
      db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        barber_id TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        service_type TEXT NOT NULL,
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, function(err) {
        if (err) {
          console.error('❌ Error creating appointments table:', err);
          return;
        }
        console.log('✅ Appointments table created/verified');
        
        db.run(`CREATE TABLE IF NOT EXISTS barber_availability (
          id TEXT PRIMARY KEY,
          barber_id TEXT NOT NULL,
          available_date TEXT NOT NULL,
          start_time TEXT NOT NULL,
          end_time TEXT NOT NULL,
          is_available INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, function(err) {
          if (err) {
            console.error('❌ Error creating barber_availability table:', err);
            return;
          }
          console.log('✅ Barber availability table created/verified');
          console.log('Database tables initialized');
          
          // NOW proceed with seeding
          seedBarbers(db);
          seedAdminUser(db);
          
          console.log('Iniciando creación de usuarios para barberos...');
          setTimeout(() => {
            seedBarberUsers(db).then(() => {
              console.log('✅ Seeding de barberos completado');
            }).catch(err => {
              console.error('❌ Error en seeding de barberos:', err);
            });
          }, 1000);
        });
      });
    });
  });
};

module.exports = db;
