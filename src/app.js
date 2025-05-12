const express = require("express");
const app = express();
const port = 8080;

app.use("/test", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
