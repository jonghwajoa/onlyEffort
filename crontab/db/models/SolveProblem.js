module.exports = (sequelize, DataTypes) => {
  const SolveProblem = sequelize.define(
    'SolveProblem',
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
      solveProblem: {
        type: DataTypes.JSON,
        allowNull: false
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      tableName: 'solveproblem',
      timestamps: false
    }
  );

  SolveProblem.createTodaySolve = (bojId, { solveProblem, size }, date, tran) => {
    return SolveProblem.create(
      {
        bojId,
        solveProblem,
        size,
        date
      },
      tran ? { transaction: tran } : {}
    );
  };

  SolveProblem.findOneByDate = (bojId, date) => {
    return SolveProblem.findOne({
      where: {
        bojId,
        date
      },
      attributes: ['solveProblem', 'size'],
      raw: true
    });
  };

  SolveProblem.findRecentTwoDataByBojId = bojId => {
    return SolveProblem.findAll({
      where: {
        bojId
      },
      attributes: ['solveProblem', 'size'],
      order: [['no', 'DESC']],
      limit: 2,
      raw: true
    });
  };

  SolveProblem.findAllByDate = date => {
    return SolveProblem.findAll({
      where: {
        date
      },
      attributes: ['bojId', 'solveProblem', 'size'],
      raw: true
    });
  };

  return SolveProblem;
};
