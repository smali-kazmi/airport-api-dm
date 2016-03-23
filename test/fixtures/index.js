var Faker = require('faker');

module.exports = {
  Users: {
    validData: [
      {
        name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        country: Faker.address.city()
      },
      {
        name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        country: Faker.address.city()
      },
      {
        name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        country: Faker.address.city()
      }
    ],
    invalidData: [
      {},
      {
        name: '',
        country: ''
      },
      {
        country: ''
      }
    ]
  },
  Airports: {
    validData: [
      {
        name: Faker.helpers.slugify(),
        link: Faker.lorem.words(),
        title: Faker.lorem.words(),
      },
      {
        name: Faker.helpers.slugify(),
        link: Faker.lorem.words(),
        title: Faker.lorem.words(),
      },
      {
        name: Faker.helpers.slugify(),
        link: Faker.lorem.words(),
        title: Faker.lorem.words(),
      }
    ],
    invalidData: [
      {},
      {link: ''},
      {name: ''}
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
  }

};