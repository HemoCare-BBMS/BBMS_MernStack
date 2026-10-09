const express = require('express');
const dotenv = require('dotenv');
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

//dotconfig
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middileware
app.use(express.json());
//only allow the frontend origins listed in CLIENT_URL (comma-separated)
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(morgan("dev"));

//routes
//1 test route
app.use('/api/v1/test', require('./router/testRouters'));
app.use('/api/v1/auth', require('./router/authRouters'));
app.use('/api/v1/inventory', require('./router/inventoryRouters'));
app.use('/api/v1/analytics', require('./router/analyticsRouters'));
app.use('/api/v1/admin', require('./router/adminRouters'));

//port
const PORT = process.env.PORT || 8080;
 
//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`
      .bgBlue.white);
});

