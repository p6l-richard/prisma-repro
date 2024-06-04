/**
 * Usage: pnpm run turso
 * 
 * This script sets up a turso database for your project, so that you can get going right away.
 */
import { $ } from 'bun';
import { readFileSync, writeFileSync } from 'node:fs';
import { config } from 'dotenv';
import { parseArgs } from 'node:util';

// database can be passed as an argument:
const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        dbName: {
            type: 'string',
        },
    },
    strict: true,
    allowPositionals: true,
});

const databaseName = values.dbName || "my-database";

console.log(`ℹ️ Setting up turso for database: ${databaseName}`);

// Install turso
await $`brew install tursodatabase/tap/turso`;

// Sign up for turso
await $`turso auth signup`;

// Create a database if not already created:
try {
    await $`turso db create ${databaseName}`;
} catch (error) {
    const stderr = error.stderr.toString();
    if (!stderr.includes('already exists')) {
        console.error(stderr);
        throw error;
    } else {
        console.log(`📦 Database ${databaseName} already exists. Error recovered.`);
    }
}

// Get the database URL
const dbUrlOutput = await $`turso db show ${databaseName} --url`.text();
const dbUrl = dbUrlOutput.trim();
console.log(`🔗 Database URL: ${dbUrl}`);

// Create a token
const tokenOutput = await $`turso db tokens create ${databaseName}`.text();
const token = tokenOutput.trim();
console.log(`🔑 Auth Token: ${token.slice(0,10)}...`);
// Load the .env.example file
const envConfig = config({ path: '.env.example' });

console.log(`📝 Updating .env file`);

// Update our env files
envConfig.parsed['TURSO_DATABASE_URL'] = `"${dbUrl}"`;
envConfig.parsed['TURSO_AUTH_TOKEN'] = `"${token}"`;

// Create a string from the updated values
const updatedConfig = Object.entries(envConfig.parsed)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

console.log(`✅ .env file updated`);
// Write the updated values to the .env file
writeFileSync('.env', updatedConfig);
console.log(`🚀 Turso setup complete!`);