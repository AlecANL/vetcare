import mysql, { Connection, Pool } from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vetcare',
  port: process.env.DB_PORT || 3306,
};

class Database {
  private static instance: Database | null = null;
  private pool: Pool;

  private constructor() {
    this.pool = mysql.createPool(dbConfig as any);
    console.log('✅ MySQL pool created');
    console.log('ENV MYSQLHOST =', process.env.DB_HOST);
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getPool(): Pool {
    return this.pool;
  }
}

export const getConnection = async () => {
  const db = Database.getInstance();
  return db.getPool();
};
