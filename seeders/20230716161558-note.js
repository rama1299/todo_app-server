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

    await queryInterface.bulkInsert("Notes", [
      {
        userId: 1,
        noteName: "Bekerja",
        noteText:
          "Bekerja dengan sungguh-sungguh agar menjadi seorang yang kaya",
        color: "blue",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        noteName: "Sekolah",
        noteText:
          "Sekolah dengan sungguh-sungguh agar menjadi seorang yang pintar",
        color: "blue",
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

    await queryInterface.bulkDelete("Notes", null, {});
  },
};
