module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order",{
        orderid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            required : true
        },
        productid: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            default: "pending",
        },
    });
    return Order;
};