module.exports = (sequelize, DataTypes) => {
  const WeeklySolve = sequelize.define(
    'WeeklySolve',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      cnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        get() {
          return this.getDataValue('cnt');
        }
      },
      week: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: 'WeeklySolve',
      timestamps: false
    }
  );

  WeeklySolve.findOneByNum = (week, number) => {
    return WeeklySolve.findOne({
      where: {
        week,
        number
      }
    });
  };

  WeeklySolve.findCurrentWeekTopTen = week => {
    return WeeklySolve.findAll({
      where: {
        week
      },
      order: [['cnt', 'desc']],
      attributes: ['number', 'name', 'cnt'],
      limit: 20,
      raw: true
    });
  };

  return WeeklySolve;
};
