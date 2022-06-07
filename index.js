require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./error/errorHandler");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

require("./db/db");
const corOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://livetheproject.online",
    "https://admin.livetheproject.online",
  ],
};
app.get("/", (req, res) => {
  res.json({ message: "Hello from Server!" });
});
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(cookieParser());

app.use("/api", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
