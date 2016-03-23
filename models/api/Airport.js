
module.exports = function(sequelize, DataTypes) {
  var Airport = sequelize.define("Airport", {
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
    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
  }, {
    tableName: 'airports',
    classMethods: {
      associate: function(models) {
        Airport.hasMany(models.Review, {as: 'reviews', foreignKey: 'fk_airport_id'});
      },
      save: function(data) {
        var $where = {
          name: data.name,
        };
        var $defaults = {
          name: data.name,
          link: data.link,
          title: data.title
        };
        return this.findOrCreate({
          where: $where, 
          defaults: $defaults
        });
      }
    }
  });

  return Airport;
};