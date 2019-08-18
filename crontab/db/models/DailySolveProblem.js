module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'DailySolveProblem',
    {
      no: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      solve_problem: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      tableName: 'tbl_daily_solve',
      underscored: true,
      timestamps: false
    }
  );
};
