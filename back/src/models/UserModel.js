const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, "Introduce tu nombre"],
        },
        email:{
            type :String ,
            match:  [/.+\@.+\..+/, 'Por favor introduzca un correo valido'],
            unique: true,
            required:[true, 'Introduce tu correo'],
        },
        password: {
            type: String,
            required: [true,'Introduce tu contraseña'],
        }, 
        role: {
            type: String,
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
    