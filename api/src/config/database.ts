import mysql, { Connection } from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vetcare',
  port: process.env.DB_PORT || 3306,
};

class Database {
  private static instance: Database | null = null;
  private connection: Promise<Connection> | null = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = mysql.createConnection(dbConfig as any);
        console.log('✅ connected to MySQL');
      } catch (error) {
        console.error('❌ MySQL connection error');
        throw error;
      }
    }

    return this.connection;
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const getConnection = async () => {
  const db = Database.getInstance();
  return await db.connect();
};
