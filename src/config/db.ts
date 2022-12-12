const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const dotenv = require('dotenv');
dotenv.config

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: "mysql"
});

const check = async function checkconnect(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default  {
  sequelize: sequelize,
  checkconnect : check,
  }
