import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    }
});

UserSchema.pre("save", async function (next) {
    try{
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }catch(err) {
        return next(err);
    }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    try{
        if(this._update.password){
            this._update.password = await bcrypt.hash(this._update.password, 10);
        }
        next();
    }catch(err) {
        return next(err);
    }
});



const User = mongoose.model("user", UserSchema);

export default User;