

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('accounts', [{
    accountNumber: '2324455',
    currentBalance: 5000,
    accountType: 'Savings',
    dateClosed: new Date(),
    userName: 'John_1234',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    accountNumber: '6764456',
    currentBalance: 1000,
    accountType: 'Savings',
    dateClosed: new Date(),
    userName: 'Suzan_best',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  down: (queryInterface) => {
    queryInterface.bulkDelete('accounts', [{
      userName: 'John1234',
    }]);
  },
};