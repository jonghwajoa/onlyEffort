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
