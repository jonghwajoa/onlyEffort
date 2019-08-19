module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        get() {
          return this.getDataValue('userId');
        }
      },
      nickname: DataTypes.STRING(20),
      bojId: DataTypes.STRING(50)
    },
    {
      freezeTableName: true,
      tableName: 'user',
      timestamps: true,
      paranoid: true
    }
  );

  User.findAllByBojId = () => User.findAll({ attributes: ['bojId'], raw: true });

  return User;
};
