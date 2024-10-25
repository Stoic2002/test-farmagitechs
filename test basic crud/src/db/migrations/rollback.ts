import {pool} from '../../config/database';

const rollback = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS sale_details;
      DROP TABLE IF EXISTS sales;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS customers;
    `);
    console.log('Rollback completed');
  } catch (error) {
    console.error('Error during rollback:', error);
  } finally {
    pool.end();
  }
};

rollback();
