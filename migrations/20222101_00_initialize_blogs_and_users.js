const { Sequelize, DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        default: 0
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      //updatedAt: {
      //  type: DataTypes.DATE
      //},
      //createdAt: {
      //  type: DataTypes.DATE
      //}
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      //updatedAt: {
      //  type: DataTypes.DATE
      //},
      //createdAt: {
      //  type: DataTypes.DATE
      //}
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}
