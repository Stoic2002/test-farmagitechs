import bcrypt from 'bcryptjs';
import {pool} from '../../config/database';

const seedUsers = async () => {
  const saltRounds = 10;
  const passwords = await Promise.all([
    bcrypt.hash('admin', saltRounds),
  ]);

  const query = `
    INSERT INTO users (username, password)
    VALUES
      ('admin', $1);
  `;

  try {
    const result = await pool.query(query, passwords);
    console.log('Seed data inserted successfully:', result.rows);
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    pool.end();
  }
};

seedUsers();
