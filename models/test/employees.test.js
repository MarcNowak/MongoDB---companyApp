const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  after(() => {
    mongoose.models = {};
  });

  it('TEST 005 - should throw an error if is no of arg "firstName", "lastName", "department" ', () => {
    const cases = [
      { firstName: 'John' }, { lastName: 'Doe' }, { department: 'IT' },
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', department: 'IT' },
      { lastName: 'Doe', department: 'IT' },
    ];
    for (let worker of cases) {
      const emp = new Employee(worker);

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('TEST 006 - should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const emp = new Employee({
        firstName,
        lastName: 'Joe',
        department: 'IT',
      });

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('TEST 007 - should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const emp = new Employee({
        firstName: 'John',
        lastName,
        department: 'IT',
      });

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('TEST 008 - should thorw an error if "department" is not a string', () => {
    const cases = [{}, []];
    for (let department of cases) {
      const emp = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department,
      });

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('TEST 009 - should not throw an error if data is correct', () => {
    const emp = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: 'IT',
    });

    emp.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});