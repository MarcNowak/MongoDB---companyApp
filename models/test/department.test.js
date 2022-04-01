const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Department', () => {
  after(() => {
    mongoose.models = {};
  });

  it('TEST 001 - should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value
  
    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  
  });

  it('TEST 002 - should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
  
    }
  
  });

});