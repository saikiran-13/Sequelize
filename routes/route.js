const express = require('express');
const router = express.Router();
const { Studentinfo } = require('../models');
const { User } = require('../models');

console.log(Studentinfo);
router.use(express.json());
router.route('/api/read').get(async (req, res) => {
  try {
    const info = await Studentinfo.findAll({ include: User });
    console.log('.............', info);
    res.json(info);
  } catch (err) {
    res.status(401).json({ msg: 'Something went wrong...' });
  }
});

router.route('/api/create').post(async (req, res) => {
  const { name, course, age, feePaid, UserId } = req.body;
  try {
    const info = await Studentinfo.create({
      name: name,
      course: course,
      age: age,
      feePaid: feePaid,
      UserId: UserId,
    });

    const details = await Studentinfo.findOne({
      where: {
        UserId: UserId,
      },
      include: User,
      order: [['UserId', 'DESC']],
    });

    // const userdetails = await details.getUser();Lazy loading remove include:User
    res.json([info, details.User]); //Eager loading
    console.log(info instanceof Studentinfo);
  } catch (err) {
    res.status(401).json({ msg: 'Something went wrong...' });
  }
});

router.route('/api/update').put(async (req, res) => {
  try {
    const info = await Studentinfo.update(
      { course: 'Nodejs' },
      { where: { name: 'sai' } },
    );
    res.json(info);
  } catch (err) {
    res.status(401).send('Something went wrong...', err);
  }
});

router.route('/api/delete').delete(async (req, res) => {
  try {
    const info = await Studentinfo.findOne({ where: { name: 'sai' } });
    await info.destroy();
    res.json(info);
  } catch (err) {
    res.status(401).send('Something went wrong...', err);
  }
});

router.route('/api/deleteall').delete(async (req, res) => {
  try {
    const info = await Studentinfo.destroy({ where: { name: 'sai' } });
    res.json(info);
  } catch (err) {
    res.status(401).send('Something went wrong...', err);
  }
});
module.exports = { router };
