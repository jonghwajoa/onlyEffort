module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'SolveProblem',
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
        type: DataTypes.JSON,
        allowNull: false
      },
      date: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      tableName: 'tbl_solve_problem',
      underscored: true,
      timestamps: false
    }
  );
};
