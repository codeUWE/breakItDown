const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/users")

//Post req
const register = async (req, res) => {
	try {
        const {body:{name,email,password,roles}}=req;
        const found = await User.findOne({email})
        if(found) throw new Error("User already Exists")
        const hash = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hash,roles})
		res.json({email:user.email,id:user._id})
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};

const login = async (req, res) => {
	try {
		const {
            body:{email,password}}
        =req;
        const user = await User.findOne({email}).select("+password"); 

        if(!user) throw new Error("User doesn't Exists")
        console.log(user)

        const match = await bcrypt.compare(password,user.password)

        if(!match)  throw new Error("Incorrect Password")
        //put profile pic here (inside the cookie)
    // add multiple roles and 
        const payload = {id:user._id,email:user.email}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"480m"})
       res.cookie("access_token",token,{httpOnly:true,maxAge:28800000}).json(payload)
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const logout = async (req, res) => {
	try {
		res.cookie("access_token","",{httpOnly:true,maxAge:0}).json({success:true})
		
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const getProfile = async (req, res) => {
	try {
        const{
            user:{id},
    }= req;
    const user = User.findById(id)
        res.json(user)
		// const {body:{name,email,password,roles}}=req;
        // const found = await User.findOne({email})
        // if(!user) throw new Error("User doesn't Exists")
        // console.log(user)
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
module.exports ={register,login,logout,getProfile};