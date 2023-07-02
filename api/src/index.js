const express = require("express");
const axios = require("axios");

const app = express();

app.get("/test", (req, res) => {
  res.send("Our API server is working correctly");
});

app.get("/testapidata", (req, res) => {
  res.json({
    testapidata: true,
  });
});

app.get("/testwithcurrentuser", (req, res) => {
  axios.get(process.env.AUTH_API_URL + "/currentUser").then((response) => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    });
  });
});

const startServer = async () => {
  try {
    const client = await connectToDb();

    app.listen(process.env.PORT, () => {
      console.log(`Started API service on port ${process.env.PORT}`);
      console.log(`Our host is ${process.env.HOST}`);
      console.log(`Database url ${process.env.DB_URL}`);
      console.log(`Auth API url ${process.env.AUTH_API_URL}`);
    });

    // Release the database client when the server is stopped
    process.on("SIGINT", () => {
      client.release();
      console.log("Database connection closed");
      process.exit();
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
};

startServer();
