const User = require("../models/user");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });

    if (!user) {
      return res.status(404).send("No new user created");
    }
    const token = user.createJWT();

    res.status(201).json({ user: { name: user.name },token});
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {

  try {
    const {email ,password} = req.body

    if(!email || !password){
      return res.status(404).json({msg : 'Please provide email and password'})
    }

    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({msg:'User not found'})
    }
    //Comparing the password
    const isPassword = await user.comparePassword(password)
    if(!isPassword){
      return res.status(404).json({msg : 'Password is incorrect'})
    }

    const token = user.createJWT()

    res.status(201).json({user :{name : user.name},token})

  } catch (error) {
    res.status(500).json({msg :error})
  }
  
 
};

module.exports = {
  login,
  register,
};
