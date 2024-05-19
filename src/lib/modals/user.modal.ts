import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        unique:true,
    },
    photo:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },

});


const User = models?.User || model("User", UserSchema);

export default User;