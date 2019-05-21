module.exports = function(sequelize, DataTypes) {
    var bashingTable = sequelize.define("bashingTable", {
      userName: DataTypes.STRING(50),
      userEmail: DataTypes.STRING(100),
      userComment: DataTypes.STRING(1065)
    });
    return bashingTable;
  };
