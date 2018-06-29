'use strict';

module.exports = {
  makeFakeNum
};

// Make sure to "npm install faker" first.
const Faker = require('faker');

function makeFakeNum(userContext, events, done) {
  // generate data with Faker:
  const num = Faker.random.number({ min: 1, max: 15 });

  // add variables to virtual user's context:
  userContext.vars.num = num;
  // continue with executing the scenario:
  return done();
}
