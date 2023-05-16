const { Schema, model } = require('mongoose');
const { comparePassword, hashPassword } = require('../services/utils');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3 },
    hashedPassword: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
};

userSchema.pre('save', function () {
    console.log('saving' + this);
});

const User = model('User', userSchema);

module.exports = User;
