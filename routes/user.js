const checkAuth = require("../middleware/auth")
const {getAllUsers,getUser, updateUser,deleteUser } = require("../controllers/userController")
const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:id' , getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
