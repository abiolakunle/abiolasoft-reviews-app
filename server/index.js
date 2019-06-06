const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const reviews = require("./routes/api/reviews");

app.use("/api/reviews", reviews);

//Handle production
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static(__dirname + "/public/"));

  //Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 1004;

app.listen(port, () => {
  console.log(`Listening on port ` + port);
});
