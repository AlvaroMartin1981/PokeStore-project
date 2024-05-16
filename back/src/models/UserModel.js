const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true,
        },
        email:{
            type :String ,
            unique: true,
            required: true
            
        },
        username:{
            type: String,
            unique: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
        },
        tokens:{ type: String } ,
        wishList: [{type: ObjectId, ref:"Product"}],
    },
    {timestamps:true}
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;
    