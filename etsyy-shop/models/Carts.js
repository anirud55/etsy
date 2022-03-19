module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart",{
        cartid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
        },
        productid: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
    });
    return Cart;
}