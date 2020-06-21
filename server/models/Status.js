module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status',{
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Acronym:{
            type: DataTypes.STRING
        },
        Description:{
            type: DataTypes.STRING
        }
    })
    
    return Status
}