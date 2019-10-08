const dotenv = require('dotenv');

if (process.env.NODE_ENV === undefined) {
  const result = dotenv.config({ path: `${__dirname}/../.env` });
  if (result.error) {
    console.log('dotenv.config error = ', result.error);
  } else {
    console.log('dotenv.config success = ', result.parsed);
  }
}

module.exports = {
  mysql_host: process.env.MYSQL_HOST,
  mysql_username: process.env.MYSQL_USERNAME,
  mysql_password: process.env.MYSQL_PASSWORD || "",
  mysql_db: process.env.MYSQL_DB,
  mysql_port: process.env.MYSQL_PORT
};
