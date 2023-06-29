const { Sequelize } = require('sequelize');
const { Studentinfo } = require('./models');
const { User } = require('./models');
const express = require('express');
const app = express();
app.use(express.json());
const sequelize = new Sequelize('learnings', 'postgres', 'sailearnings', {
  host: 'localhost',
  dialect: 'postgres',
});

(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Authentication done successfully!!!');
    setTimeout(() => {
      sequelize.close();
      console.log('Connection closed................');
    });
  } catch (error) {
    console.log('An error occured', error);
  }

  //Getters,setters,createinstance

  const student = await Studentinfo.create({
    name: 'sai',
    course: 'blockchain',
    age: 21,
    feePaid: false,
    UserId: 2,
  });

  const user = await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'WIck@example.com',
    createdAt: '2023-06-02T09:40:39.618Z',
    updatedAt: '2023-06-02T09:40:39.618Z',
  });

  const deletedata = await User.findOne({
    where: {
      firstName: 'John',
    },
    order: [['id', 'ASC']],
  });
  const data = await User.findAll({
    where: {
      firstName: 'John',
    },
    paranoid: false,
  });
  console.log(await data);
  await deletedata.destroy({ force: true });

  // student.setUser(user);
  // console.log(await student.getUser());
  //also createUser
})();
