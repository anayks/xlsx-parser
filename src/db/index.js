const config = require("../config/output.js");
const { 
  Sequelize, 
  Model, 
  DataTypes,
} = require('sequelize');

module.exports = async () => {
  const sequelize = new Sequelize(`sqlite:${config.path}/${config.fileName}.db`, {
    query: {
      raw: true,
    }
  });
  
  class Mattress extends Model {}
  
  const table = Mattress.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      sale: DataTypes.INTEGER,
      price_opt: DataTypes.INTEGER,
    }, 
    { 
      sequelize, 
      modelName: config.modelName,
    },
  );
  await sequelize.sync();
  return table;
}
