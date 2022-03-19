module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define("Shop",{
        shopid: {
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
        shopname: {
            type: DataTypes.STRING,
            unique: true,
            required : true
        },
        description: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
            default: "https://kripson.com/wp-content/uploads/2020/12/product-placeholder.jpg",
        },
        count: {
            type: DataTypes.INTEGER,
        },
    });
    return Shop;
};