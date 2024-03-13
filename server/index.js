
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./config/DBconnection');

const userRouter = require("./Router/userRouter");
const authRouter = require("./Router/authRouter");

// Database Connection:
connection();

// Middlewares:
app.use(express.json());
app.use(cors());

// Router:
app.use('/user', userRouter); 
app.use('/auth', authRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));














// require('dotenv').config;
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const connection = require('./config/DBconnection');

// const userRouter = require("./Router/userRouter");
// const authRouter = require("./Router/authRouter");

// //Database Connection:
// connection();


// //Router:
// app.use('/user', userRouter); 
// app.use('/auth', authRouter);

// // Middlewares:
// app.use(express.json());
// app.use(cors());


// const port = process.env.PORT || 6000;
// app.listen(port, ()=> console.log(`server running on port ${port}`));