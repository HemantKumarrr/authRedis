const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        lowercase: true,
        unique: true,
        validate: [isEmail, "invalid email"]
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minLength: [6, "minimum password length is 6 characters"]
    }
});

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.statics.login = async function (email, password) {
    const userExits = await this.findOne({ email });
    if(userExits) {
        const authCheck = await bcrypt.compare(password, userExits.password);
        if(authCheck) {
            return userExits;
        } throw Error("wrong password");
    } throw Error("no user found");
}

const User = mongoose.model('users', userSchema);

module.exports = User;