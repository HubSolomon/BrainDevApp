

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error();
    }

    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error: 'Login failed' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send({ error: 'Logout failed' });
  }
};
