const jwt = require('jsonwebtoken');
require("dotenv").config()

const virefytoken = async(token)=>{
    try{
        if(!token){
            return null
        }
        const currentuser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        return currentuser;
    }catch(e){
        return null
    } 
}


module.exports = virefytoken;