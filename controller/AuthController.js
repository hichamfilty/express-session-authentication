const User = require('../model/user');

const login = (req, res) => {
  return res.status(200).json({ msg: 'user successfully logged in'});
};

const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(!user) {
      let newUser = new User({ name, email, password });
      await newUser.save();
      return res.status(200).json({ msg: 'user successfully created' })
    }
    return res.status(422).json({ errors: 'the user with this email already exist'});
  } catch(error){
    console.error(error);
    res.status(500).json({errors: ['some error occured']})
  }
};

const logout = (req, res) => {
  req.logout();
  res.status(200).json({ msg: 'logged out' });
};

const me = (req, res) => {
  if(!req.user){
    return res.status(403).json({ user: req.user });
  }
  return res.status(200).json({ user: req.user })
}
module.exports = { signup, login, logout, me }