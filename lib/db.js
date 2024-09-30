/**
 * Database Connection Module
 *
 * This module establishes a connection to the PostgreSQL database using a connection pool.
 * It exports a query method that can be used to execute SQL queries against the database.
 *
 * The connection is configured using the DATABASE_URL environment variable, which should
 * contain the full connection string for the PostgreSQL database.
 *
 * SSL is configured to reject unauthorized connections, but this setting may need to be
 * adjusted based on your specific deployment environment.
 *
 * Usage:
 * import db from './db';
 * const result = await db.query('SELECT * FROM your_table', []);
 *
 * @module Pool
 * @requires pg
 */

import { Pool } from "pg";

// creating a new  pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10, // maximum  number of connections
  idleTimeoutMillis: 30000, // close  idle connections after 30 seconds
});

// exporting the query method
export default {
  query: (text, params) => pool.query(text, params),
};
