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

  DailySolve.findCurrentWeekTopUser = week => {
    return DailySolve.findAll({
      where: {
        week
      },
      attributes: ['bojId', [DailySolve.sequelize.fn('count', '*'), 'count']],
      group: 'bojId',
      order: [[DailySolve.sequelize.col('count'), 'desc']],
      raw: true
    });
  };

  //SELECT *,count(*) FROM algotest.dailysolve where week=34 group by date,bojId;

  DailySolve.findDailySolveCntByWeek = week => {
    return DailySolve.findAll({
      where: {
        week
      },
      attributes: ['bojId', [DailySolve.sequelize.fn('count', '*'), 'count'], 'date'],
      group: ['date', 'bojId'],
      order: [[DailySolve.sequelize.col('bojId'), 'desc'], ['date', 'asc']],
      raw: true
    });
  };

  DailySolve.findRangeDate = (bojId, date) => {
    return DailySolve.findAll({
      where: {
        bojId,
        date
      },
      attributes: ['number', 'name', 'date'],
      order: [['date', 'asc']],
      raw: true
    });
  };
  return DailySolve;
};
