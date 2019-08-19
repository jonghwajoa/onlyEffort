module.exports = (sequelize, DataTypes) => {
  const DailySolve = sequelize.define(
    'DailySolve',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      bojId: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      date: {
        type: DataTypes.INTEGER
      },
      week: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      tableName: 'DailySolve',
      timestamps: false
    }
  );

  return DailySolve;
};
