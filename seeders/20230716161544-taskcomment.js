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

    await queryInterface.bulkInsert("TaskComments", [
      {
        userId: 1,
        taskId: 1,
        commentText: "Jangan lupa di catat!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        taskId: 1,
        commentText: "Perhatikan dengan detail!",
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

    await queryInterface.bulkDelete("TaskComments", null, {});
  },
};
