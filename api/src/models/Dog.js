const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 , primaryKey: true},
    height:{type:DataTypes.STRING,//DataTypes.RANGE(DataTypes.INTEGER)//
     allowNull:false},//este dato es llamativo
    weight: {type: DataTypes.STRING,// DataTypes.RANGE(DataTypes.INTEGER), 
      allowNull:false},
    life_span:{type:DataTypes.STRING,//DataTypes.RANGE(DataTypes.INTEGER)
  }
  },{
    timestamps: false,});
};
