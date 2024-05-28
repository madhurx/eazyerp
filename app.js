const express = require('express')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const sequelize = require("./config/sequelize");


const dotenv = require('dotenv');
const checkAuth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

sequelize.authenticate().then(() => {
  (async () => {
    await sequelize.sync();
  })();
  console.log("Database connect successful")
}).catch((err) => {
  console.log("Database connection failed")
})

app.use('/api/auth', authRoutes);
app.use('/api/user', checkAuth, userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app;
