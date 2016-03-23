
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null
    },
    experience_airport: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    date_visit: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null
    },
    type_traveller: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    overall_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    queuing_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    terminal_cleanliness_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    terminal_seating_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    terminal_signs_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    food_beverages_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    wifi_connectivity_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    airport_staff_rating: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
    recommended: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null
    },
  }, {
    tableName: 'reviews',
    classMethods: {
      associate: function(models) {
        Review.belongsTo(models.Airport, {as: 'airport', foreignKey: 'fk_airport_id' });
        Review.belongsTo(models.User, {as: 'author', foreignKey: 'fk_user_id' });
      },
      save: function(data) {
        var $where = {
          fk_airport_id: data.fk_airport_id,
          fk_user_id: data.fk_user_id,
          date: data.date
        }
        var $defaults = data;
        return this.findOrCreate({
          where: $where,
          defaults: $defaults
        })
        .spread(function(review, isNew){
          if(isNew) {
            return review;
          } else {
            return review.update(data);
          }
        });
      },
      get: function(id) {
        return this.find({
          where: {id: id},
          include: [global.db.User, global.db.Airport]
        })
      },
      getByAirportId: function(airport_id) {
        return this.findAll({
          where: {fk_airport_id: airport_id},
          attributes: ['id', 'overall_rating', 'recommended', 'date', 'content'],
          include: [{model: global.db.User, as: 'author', attributes: ['id', 'name', 'country']}],
          order: 'date desc'
        })        
      }
    }
  });

  return Review;
};