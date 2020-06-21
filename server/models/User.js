module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username:{
            type: DataTypes.STRING
        },
        Password:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    User.associate = models => {
        User.belongsTo(models.Status,{
            foreignKey: 'FKStatus'
        })
    }

    User.findById = async function(id){
        return await this.findOne({where:{
            Id: id,
            FKStatus: global.STATUS.ACTIVE
        }})
    }

    return User
}