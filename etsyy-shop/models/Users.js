module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        fname : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uname : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Users;
}