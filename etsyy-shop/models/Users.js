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
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Users;
}