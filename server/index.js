const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const reviews = require("./routes/api/reviews");

app.use("/api/reviews", reviews);

const port = process.env.PORT || 1004;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ` + port);
});
