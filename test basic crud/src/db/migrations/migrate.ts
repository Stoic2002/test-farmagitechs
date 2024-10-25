import fs from 'fs';
import path from 'path';
import {pool} from '../../config/database';

const runMigration = async () => {
  const migrationPath = path.join(__dirname, 'schema','migrations.sql');
  const migrationQuery = fs.readFileSync(migrationPath, 'utf-8');

  try {
    await pool.query(migrationQuery);
    console.log('Migration successfully executed.');
  } catch (error) {
    console.error('Error executing migration:', error);
  } finally {
    pool.end();
  }
};

runMigration();
