const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('race', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        minHeight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maxHeight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        minWeight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maxWeight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life_span: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createInDb:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
}