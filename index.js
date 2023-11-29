const express = require("express");
const app = express();
const logger = require("./logger.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("<h1>Hello welcome</h1>");
});
app.use("/api/Members", require("./routes/api/Members"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`running on port ${PORT}`));
