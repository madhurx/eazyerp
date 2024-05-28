const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  // Extracting token
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Access Denied');
    }

    //Token Validation
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).send('Invalid Token');
    }
    req.user = verified;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).send("error");


  }
}

module.exports = checkAuth