const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testingEmployeeOne = new Employee({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      await testingEmployeeOne.save();

      const testingEmployeeTwo = new Employee({
        firstName: 'first_name_002',
        lastName: 'last_name_002',
        department: 'department_002',
      });
      await testingEmployeeTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('TEST 019 - should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('TEST 020 - should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      const expectedFirstName = 'first_name_001';
      expect(employee.firstName).to.be.equal(expectedFirstName);
    });
  });

  describe('Creating data', () => {
    it('TEST 021 - should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testingEmployeeOne = new Employee({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      await testingEmployeeOne.save();

      const testingEmployeeTwo = new Employee({
        firstName: 'first_name_002',
        lastName: 'last_name_002',
        department: 'department_002',
      });
      await testingEmployeeTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('TEST 022 - should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: 'first_name_001' },
        { $set: { firstName: '=first_name_001=' } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: '=first_name_001=',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('TEST 023 - should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({
        firstName: 'first_name_002',
        lastName: 'last_name_002',
        department: 'department_002',
      });
      employee.firstName = '=first_name_002=';
      employee.lastName = '=last_name_002=';
      employee.department = '=department_002=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: '=first_name_002=',
        lastName: '=last_name_002=',
        department: '=department_002=',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('TEST 024 - should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany(
        {},
        {
          $set: {
            firstName: 'Updated!',
            lastName: 'Updated LastName!',
            department: 'Updated Department!',
          },
        }
      );
      const employees = await Employee.find();
      expect(employees[0].firstName).to.be.equal('Updated!');
      expect(employees[0].lastName).to.be.equal('Updated LastName!');
      expect(employees[0].department).to.be.equal('Updated Department!');

      expect(employees[1].firstName).to.be.equal('Updated!');
      expect(employees[1].lastName).to.be.equal('Updated LastName!');
      expect(employees[1].department).to.be.equal('Updated Department!');
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testingEmployeeOne = new Employee({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      await testingEmployeeOne.save();

      const testingEmployeeTwo = new Employee({
        firstName: 'first_name_002',
        lastName: 'last_name_002',
        department: 'department_002',
      });
      await testingEmployeeTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('TEST 025 - should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({ firstName: 'first_name_001' });
      const deletedEmployee = await Employee.findOne({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      expect(deletedEmployee).to.be.null;
    });

    it('TEST 026 - should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      await employee.remove();

      const removedEmployee = await Employee.findOne({
        firstName: 'first_name_001',
        lastName: 'last_name_001',
        department: 'department_001',
      });
      expect(removedEmployee).to.be.null;
    });

    it('TEST 027 - should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany({});
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});