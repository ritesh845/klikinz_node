const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:{ type: String,max:100},
    last_name:{ type: String,max:150},
    username : {type:String,unique: true},
    email: {type: String, required: true,unique: true},
    mobile: {type: String},
    password:  { type:String, required: true },
    email_verified_at : {type:Date},
    language: { },
});

module.exports = mongoose.model('User', UserSchema );