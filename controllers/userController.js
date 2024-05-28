const Users = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username"],
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, { attributes: ["id", "username"] });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await Users.update({ username }, { where: { id: req.params.id } });
    res.status(200).send("User Updated");
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await Users.destroy({ where: { id: req.params.id } });
    if (result) {
      console.log(result)
      return res.status(200).send('User deleted');
    }
    else {
      return res.status(404).send('User not found');

    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser }