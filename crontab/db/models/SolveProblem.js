module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
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
};
