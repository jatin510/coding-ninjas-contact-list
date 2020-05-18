const express = require("express");
const port = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, (err) => {
  if (err) console.log(`error , ${err}`);

  console.log(`server running on ${port}`);
});
