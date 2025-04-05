import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema/index.js",
    out: "./migrations",
    dialect: "mysql",
    dbCredentials: {
        host: "localhost",
        user: "root",
        password: "crossroads",  
        database: "drizzle",
        port: "3306",  
        ssl: undefined
    }
});