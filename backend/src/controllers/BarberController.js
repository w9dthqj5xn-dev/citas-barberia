const Barber = require('../models/Barber');

class BarberController {
  static async getAll(req, res) {
    try {
      const barbers = await Barber.findAll();
      res.json(barbers);
    } catch (error) {
      console.error('Get barbers error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const barber = await Barber.findById(id);

      if (!barber) {
        return res.status(404).json({ error: 'Barber not found' });
      }

      res.json(barber);
    } catch (error) {
      console.error('Get barber error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async create(req, res) {
    try {
      const { name, specialty, phone, email } = req.body;

      if (!name || !specialty) {
        return res.status(400).json({ error: 'Name and specialty are required' });
      }

      const barber = await Barber.create(name, specialty, phone || null, email || null);

      res.status(201).json({
        message: 'Barber created successfully',
        barber,
      });
    } catch (error) {
      console.error('Create barber error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, specialty, phone, email } = req.body;

      if (!name || !specialty) {
        return res.status(400).json({ error: 'Name and specialty are required' });
      }

      const updatedBarber = await Barber.update(id, name, specialty, phone || null, email || null);

      res.json({
        message: 'Barber updated successfully',
        barber: updatedBarber,
      });
    } catch (error) {
      console.error('Update barber error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deactivate(req, res) {
    try {
      const { id } = req.params;
      const barber = await Barber.deactivate(id);

      res.json({
        message: 'Barber deactivated successfully',
        barber,
      });
    } catch (error) {
      console.error('Deactivate barber error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = BarberController;
