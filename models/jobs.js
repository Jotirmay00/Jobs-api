
const mongoose = require('mongoose')


const JobSchema = new mongoose.Schema(
    {
        company : {
            type : String,
            required : true,
            maxlength : 50,

        },
        position :{
            type : String,
            required : true,
            maxlength : 40,
        },
        // enum takes value in an array
        status :{
            type : String,
            enum : ['interview','pending','declined']
        },
        // Stores the refrence of the user with their id
        createdBy :{
            type : mongoose.Types.ObjectId,
            ref : 'User',
            required : true,
        }

    },
    {
        timestamps :true
    }
)

module.exports = mongoose.model('Job',JobSchema)