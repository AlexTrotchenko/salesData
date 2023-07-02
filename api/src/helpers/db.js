const {
  db_host,
  db_name,
  db_password,
  db_port,
  db_user,
} = require("../configuration");
const { Pool } = require("pg");

const pool = new Pool({
  user: db_user,
  host: db_host,
  database: db_name,
  password: db_password,
  port: db_port,
});

module.exports.connectToDb = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    return client;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};
