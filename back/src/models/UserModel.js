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
            match:  [/.+\@.+\..+/],
            unique: true,
            required: true
            
        },
        password: {
            type: String,
            required: true
        }, 
        role: {
            type: String,
            enum: ['admin', 'user'],
            default:'user'
        },
        tokens:[],
        orderIds: [{type: ObjectId, ref: "Order"}],
        wishList: [{type: ObjectId, ref:"Product"}],
    },
    {timestamps:true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
    