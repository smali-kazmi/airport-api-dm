
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
  }, {
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Review, {as: 'reviews', foreignKey: 'fk_user_id'});
      },
      save: function(data) {
        var $where = {
          name: data.name,
          country: data.country
        };
        var $defaults = {
          name: data.name,
          country: data.country
        };
        return this.findOrCreate({
          where: $where,
          defaults: $defaults
        });
      }
    }
  });

  return User;
};