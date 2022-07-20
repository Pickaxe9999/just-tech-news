const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create the User model
class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        id:{
            //use the sequelize data type object provide what type of data it is
            type: DataTypes.INTEGER,

            //do not allow empty or null ids
            allowNull: false,
            
            //instruct this as the Primary Key
            primaryKey: true,

            //turn on auto increment
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,

            //no duplicate values can be input into the table
            unique:true,

            //if allNull is false then we can run through validators before creating the table data
            validate:{
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                //set a minimum length of 4 characters
                len: [4]
            }
        }
    },
    {
        hooks: {
            //setup beforeCreate lifecycle hook functionality
            async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            //setup beforeUpdate lifecycle hook functionality
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
                return updatedUserData;
            }

        },
        //Table configuration options go here
        
        //pass in the connection
        sequelize,

        //dont auto create timestamp fields
        timestamps: false,

        //dont pluralize name of database table
        freezeTableName:true,

        //use underscores instead of camel-casing
        underscored:true,

        //make the model name stay lowercased in the database
        modelName: 'user'
    }
)

module.exports = User;