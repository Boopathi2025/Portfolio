const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

let dbInstance = null;
let dbType = 'sqlite'; // 'sqlite' or 'postgres'

async function initializeDb() {
    if (process.env.DATABASE_URL) {
        dbType = 'postgres';
        console.log('Connecting to PostgreSQL...');
        dbInstance = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false } // Required for most cloud providers like Neon/Heroku
        });
        // Test connection
        try {
            await dbInstance.query('SELECT 1');
            console.log('PostgreSQL connected.');
        } catch (err) {
            console.error('PostgreSQL connection failed:', err);
            process.exit(1);
        }
    } else {
        dbType = 'sqlite';
        console.log('Using local SQLite database...');
        dbInstance = await open({
            filename: path.join(__dirname, 'portfolio.sqlite'),
            driver: sqlite3.Database
        });
    }

    await createTables();
    await seedAdmin();
    return dbInstance;
}

// Unified Query Interface
async function query(sql, params = []) {
    if (!dbInstance) await initializeDb();

    if (dbType === 'postgres') {
        // Convert ? placeholders to $1, $2, etc.
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);

        const result = await dbInstance.query(pgSql, params);
        // Standardize output to look like SQLite result if possible, or just return rows
        // For SELECT, we usually want rows.
        // For INSERT/UPDATE, we might want rowCount.

        // We will return an object with helper properties to match what our app expects
        return {
            rows: result.rows,
            // Emulate SQLite 'get' (single row) and 'all' (array) behavior via helper methods attached to result is tricky 
            // Better to standardise return values in the route handlers. 
            // But to minimize route refactoring, we can return the raw result here and handle it in wrapper methods below.
        };
    } else {
        // SQLite
        // We will delegate specific calls (all, get, run) in the wrappers below
        // This function is just a raw execute? No, let's change architecture slightly.
        // We shouldn't use this generic 'query' for everything if the underlying libs are so different.
        // Let's use the explicit wrappers 'fetchOne', 'fetchAll', 'execute'.
        return null;
    }
}

// Wrapper methods to standardize usage across app
async function fetchOne(sql, params = []) {
    if (!dbInstance) await initializeDb();

    if (dbType === 'postgres') {
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
        const res = await dbInstance.query(pgSql, params);
        return res.rows[0];
    } else {
        return await dbInstance.get(sql, params);
    }
}

async function fetchAll(sql, params = []) {
    if (!dbInstance) await initializeDb();

    if (dbType === 'postgres') {
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
        const res = await dbInstance.query(pgSql, params);
        return res.rows;
    } else {
        return await dbInstance.all(sql, params);
    }
}

async function execute(sql, params = []) {
    if (!dbInstance) await initializeDb();

    if (dbType === 'postgres') {
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
        const res = await dbInstance.query(pgSql, params);
        return { changes: res.rowCount };
    } else {
        return await dbInstance.run(sql, params);
    }
}

async function createTables() {
    const isPg = dbType === 'postgres';
    const idType = isPg ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    const textType = 'TEXT';

    // Commands
    const commands = [
        `CREATE TABLE IF NOT EXISTS users (id ${idType}, username ${textType} UNIQUE, password_hash ${textType})`,
        `CREATE TABLE IF NOT EXISTS hero (id ${idType}, title ${textType}, subtitle ${textType}, image_url ${textType})`,
        `CREATE TABLE IF NOT EXISTS about (id ${idType}, content ${textType})`,
        `CREATE TABLE IF NOT EXISTS projects (id ${idType}, title ${textType}, description ${textType}, tech_stack ${textType}, link ${textType}, image_url ${textType}, created_at ${isPg ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'})`,
        `CREATE TABLE IF NOT EXISTS skills (id ${idType}, category ${textType}, name ${textType}, level INTEGER)`,
        `CREATE TABLE IF NOT EXISTS logs (id ${idType}, title ${textType}, content ${textType}, date ${isPg ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'})`
    ];

    for (const cmd of commands) {
        if (isPg) {
            await dbInstance.query(cmd);
        } else {
            await dbInstance.exec(cmd);
        }
    }
}

async function seedAdmin() {
    // Check if admin exists
    const admin = await fetchOne('SELECT * FROM users WHERE username = ?', ['admin']);
    if (!admin) {
        const hash = await bcrypt.hash('admin123', 10);
        await execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', ['admin', hash]);
        console.log('Default admin user created');
    }
}

module.exports = { initializeDb, fetchOne, fetchAll, execute };
