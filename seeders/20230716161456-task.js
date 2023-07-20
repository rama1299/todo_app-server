"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Tasks", [
      {
        userId: 1,
        listId: 1,
        taskName: "Buat desain database",
        description: "dbdiagram.io",
        dueDate: "2023-07-20",
        isPriority: true,
        status: "ongoing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        listId: 1,
        taskName: "Buat API",
        description: "node.js",
        dueDate: "2023-07-21",
        isPriority: false,
        status: "ongoing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
