import {Pool} from "pg"

const psql = new Pool({
    user: process.env.PG_DB_USER,
    host: process.env.PG_DB_HOST,
    database: process.env.PG_DB_NAME,
    password: process.env.PG_DB_PASS,
    port: 5432,
})

export default psql