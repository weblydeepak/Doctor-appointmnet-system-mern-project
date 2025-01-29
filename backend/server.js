const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRoutes");
const adminRouter = require("./Routes/admin");
const doctorRouter = require("./Routes/Doctor");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors
  ({
   origin: "http://localhost:5173",
    credentials: true
   }));
app.use(cookieParser());
app.use(morgan("dev"));


// Environment variables
const PORT = process.env.PORT || 5000;
const db_url = process.env.DB_URL;


app.use('/api/user', userRoutes)
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to the ",
    });
});
mongoose
  .connect(db_url)
  .then(() => console.log("MongoDB Connected...".green.bold))
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
