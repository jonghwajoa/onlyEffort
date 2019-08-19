module.exports = (sequelize, DataTypes) => {
  const SolveProblem = sequelize.define(
    'SolveProblem',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
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

  SolveProblem.createTodaySolve = (userId, { solveProblem, size }, date) => {
    return SolveProblem.create({
      userId,
      solveProblem,
      size,
      date
    });
  };

  SolveProblem.findOneByDate = (userId, date) => {
    return SolveProblem.findOne({
      where: {
        userId,
        date
      },
      attributes: ['solveProblem', 'size'],
      raw: true
    });
  };

  SolveProblem.findAllByDate = date => {
    return SolveProblem.findAll({
      where: {
        date
      },
      attributes: ['userId', 'solveProblem', 'size'],
      raw: true
    });
  };

  return SolveProblem;
};
