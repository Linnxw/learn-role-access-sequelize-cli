'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubMenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      masterMenuId: {
        type: Sequelize.BIGINT
      },
      icon: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      ordering: {
        type: Sequelize.INTEGER
      },
      isTargetSelf: {
        type: Sequelize.BOOLEAN
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SubMenus');
  }
};