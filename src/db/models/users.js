'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Users.belongsTo(models.Roles, {
        as: 'role',
        foreignKey: 'roleId'
      })
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users'
  })

  return Users
}
