module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        fname : {
            type: DataTypes.STRING,
        },
        lname : {
            type: DataTypes.STRING,
        },
        uname : {
            type: DataTypes.STRING,
            unique: true
        },
        email : {
            type: DataTypes.STRING,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
        },
    })
    return Users;
}