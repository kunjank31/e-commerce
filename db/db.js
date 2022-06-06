const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.DEBUG_MODE === "true"
      ? process.env.OFFLINE_MONGODB_URI
      : process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(
      process.env.DEBUG_MODE === "true"
        ? "Local Database is connected successfully..."
        : "Main Database is connected successfully..."
    );
  })
  .catch((e) => {
    console.log(e);
  });
