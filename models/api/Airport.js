
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
      },
      getAllStats: function() {
        var query = [
          "SELECT a.id, a.name, count(*) as total_reviews FROM airports a",
          "LEFT JOIN reviews r on a.id = r.fk_airport_id",
          "GROUP BY a.id",
          "ORDER BY total_reviews desc"
        ].join(" ");
        return sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
      },
      getStatById: function(id) {
        return this.find({
          where: {id: id},
          include: [{model: global.db.Review, as: 'reviews'}]
        })
      }
    }
  });

  return Airport;
};