'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // for demo purposes only
    await queryInterface.bulkDelete('Employees', null, {})
    await queryInterface.bulkInsert('Employees',
      [
        { id: 1, title: "Full stack", name: "John Doe", email: "john-doe@gmail.com", city: "New York", department: "technical", age: 24, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 2, title: "Lawyer", name: "Rachelle saliba", email: "rachellsal@live.com", city: "sin el Fil", department: "management", age: 27, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 3, title: "Graphic Designer", name: "Lea Abi Raad ", email: "leabiraad@hotmail.com", city: "Sin el fil", department: "technical", age: 29, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 4, title: "Full stack", name: "Zahra Haidar", email: "zahrahaidar7@gmail.com", city: "Beirut", department: "technical", age: 32, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 5, title: "Accountant", name: "Noah Mourad", email: "mourad@gmail.com", city: "Beirut", department: "management", age: 36, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 6, title: "Secretary", name: "Nour Akil", email: "nour123@gmail.com", city: "Beirut", department: "management", age: 21, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 7, title: "graphic designer", name: "Zeina Hachache", email: "zeinahch@gmail.com", city: "Beirut", department: "technical", age: 25, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 8, title: "Senior Developer", name: "Raymond Jbeily", email: "rayjbeily@live.com", city: "Beirut", department: "technical", age: 26, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ]
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
