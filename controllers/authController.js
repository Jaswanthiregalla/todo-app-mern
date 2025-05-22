require("dotenv").config()

const User = require("../models/User")
const jwt = require("jsonwebtoken")

async function registerUser(req, res){
    let {firstName, lastName, username, password}= req.body
   
    
    try {
        const duplicate = await User.find({username})
        if (duplicate && duplicate.length > 0) {
            return res.status(400).send({message: "User already registered with this username"})
        }
        const user = new User({firstName, lastName, username, password})
        const result = await user.save()
        res.status(201).send({message: "User registered successfully"})
      
        console.log(result)
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

async function loginUser(req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        console.log("Fetched user:", user)
console.log("Type of comparePassword:", typeof user.comparePassword)
        if (!user){
            return res.status(404).send({message: "Authentication Failed!"})
        }
        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid) {
            return res.status(404).send({message: "You Entered Wrong Password"});
          

        }
        let token = jwt.sign({userId:user?._id},process.env.JWT_SECRET,{expiresIn: "1h"})
        let finalData = {
            userId: user?._id,
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            token
        }
        res.send(finalData)


    }catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const AuthController = {
    registerUser,
    loginUser
    
}

module.exports = AuthController  
