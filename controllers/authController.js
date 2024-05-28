const Users = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = await Users.create({ username, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: Number(process.env.TOKEN_EXPIRY) });
    res.cookie("token", token, {
      maxAge: 1000 * Number(process.env.TOKEN_EXPIRY),
      httpOnly: true,
    });
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)

  }

}

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(400).send('Username or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: Number(process.env.TOKEN_EXPIRY) });
    res.cookie("token", token, {
      maxAge: 1000 * Number(process.env.TOKEN_EXPIRY),
      httpOnly: true,
    });

    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)

  }
};

module.exports = { register, login }