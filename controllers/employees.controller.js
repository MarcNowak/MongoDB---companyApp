const Employee = require('../models/employees.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand).populate('department');
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getItem = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id).populate('department');
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putItem = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const dep = await Employee.findById(req.params.id).populate('department');
    if (dep) {
      await Employee.updateOne(
        { _id: req.params.id },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            department: department,
          },
        }
      ).populate('department');
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteItem =  async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (dep) {
      await Employee.remove(dep);
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not Found ...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};