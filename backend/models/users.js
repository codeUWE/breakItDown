/* eslint-disable no-undef */
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	
	name: { type: String, required: true },
	age: { type: Number },
    email: { type: String, unique: true, required: true },
    password:{type: String, required: true},
    profilePicture:{type:String},
    socialConnections:[{type:String}],
    availability:{type:String, enum:["available","busy","invisible"],default:"available"},
	roles: [{  type: Schema.Types.ObjectId, ref: 'Role' ,required:true}],

    
});

const User = model('User', userSchema);
module.exports = User;