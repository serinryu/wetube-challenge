import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    avatarUrl: String,
})

userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5)
    } //password 가 modified 될 때에만 해싱
});

const User = mongoose.model('User', userSchema);
export default User;