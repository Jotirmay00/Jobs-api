const jwt =require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next)=>{
    
    const authHeader = req.header.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(404).json({msg : 'Authorization Failed'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = await jwt.verify(token,process.env.JWT_KEY)
        req.user = {userId : payload.userId,name : payload.name}
        next()
    } catch (error) {
        res.status(404).json({msg : 'Invalid Authorization'})
    }
}

module.exports = auth