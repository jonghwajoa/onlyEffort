module.exports = (sequelize, DataTypes) => {
  const dailySolveProblem = sequelize.define(
    'dailySolveProblem',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },

      problemNumber: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: 'tbl_daily_solve_problem',
      underscored: true,
      timestamps: false
    }
  );

  return dailySolveProblem;
};
