module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define("Shop",{
        shopid: {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "https://kripson.com/wp-content/uploads/2020/12/product-placeholder.jpg",
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Shop;
};