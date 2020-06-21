module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task',{
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Title:{
            type: DataTypes.STRING
        },
        Description:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    Task.associate = models => {
        Task.belongsTo(models.User,{
            foreignKey: 'FKUser'
        })

        Task.belongsTo(models.Status,{
            foreignKey: 'FKStatus'
        })
    }

    return Task
}