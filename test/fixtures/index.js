var Faker = require('faker');
var _ = require('lodash');

module.exports = {
  Users: {
    validData: [
      {
        author: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        author_country: Faker.address.city()
      },
      {
        author: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        author_country: Faker.address.city()
      },
      {
        author: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        author_country: Faker.address.city()
      }
    ],
    invalidData: [
      {},
      {
        author: '',
        author_country: ''
      },
      {
        author_country: ''
      }
    ]
  },
  Airports: {
    validData: [
      {
        airport_name: Faker.helpers.slugify(),
        link: Faker.lorem.words(),
        title: Faker.lorem.words(),
      },
      {
        airport_name: Faker.helpers.slugify(),
        link: Faker.lorem.words(),
        title: Faker.lorem.words(),
      },
      {
        airport_name: Faker.helpers.slugify(),
        link: Faker.lorem.words(),
        title: Faker.lorem.words(),
      }
    ],
    invalidData: [
      {},
      {link: ''},
      {airport_name: ''}
    ]
  },
  Reviews: {
    validData: [
      {
        'overall_rating': 1, 
        'recommended': 0, 
        'date': '2014-02-02', 
        'content': Faker.lorem.paragraph()
      },
      {
        'overall_rating': 1, 
        'recommended': 0, 
        'date': '2014-02-01', 
        'content': Faker.lorem.paragraph()
      },
      {
        'overall_rating': 1, 
        'recommended': 0, 
        'date': '2013-02-02', 
        'content': Faker.lorem.paragraph()
      }
    ],
    invalidData: [
      {},
      {'date': ''}
    ]
  },
  customData: function(){

    var data = [];
    data.push(_.assignIn({}, 
        this.Users.validData[0],
        this.Airports.validData[0],
        this.Reviews.validData[0]
      )
    );
    data.push(_.assignIn({}, 
        this.Users.validData[0],
        this.Airports.validData[0],
        this.Reviews.validData[1]
      )
    );
    data.push(_.assignIn({}, 
        this.Users.validData[0],
        this.Airports.validData[0],
        this.Reviews.validData[2]
      )
    );

    data.push(_.assignIn({}, 
        this.Users.validData[0],
        this.Airports.validData[1],
        this.Reviews.validData[1]
      )
    );

  }

};