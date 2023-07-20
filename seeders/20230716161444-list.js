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

    await queryInterface.bulkInsert("Lists", [
      {
        userId: 1,
        listName: "Bekerja",
        color: "blue",
        isFavorites: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        listName: "Sekolah",
        color: "green",
        isFavorites: true,
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

    await queryInterface.bulkDelete("Lists", null, {});
  },
};
