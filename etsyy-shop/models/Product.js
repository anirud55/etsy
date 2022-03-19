module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",{
        productid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryid: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            required: true
        },
        desc: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.STRING,
        },
        color: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
            required: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            required: true
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            default: 0,
        },
    });
    return Product;
};