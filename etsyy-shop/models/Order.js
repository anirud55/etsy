module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order",{
        orderid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required : true
        },
        productid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: "pending",
        },
    });
    return Order;
};