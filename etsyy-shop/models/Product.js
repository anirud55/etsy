module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",{
        productid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        categoryid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            required: true
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 0,
        },
    });
    return Product;
};