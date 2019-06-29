const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const PORT = parseInt(process.env.PORT) || 3000;
const firebase = require("./utils/firebase");

main();
function main() {
  const app = express();
  const pathStatic = path.join(__dirname, "..", "public/");
  app.use(express.static(pathStatic));
  app.get("/", (req, res) => {
    firebase.database().ref("test").push({
      hello:"sss"
    })
    res.sendFile(pathStatic + "page1.html");
  });
  app.get("/2", (req, res) => {
    res.sendFile(pathStatic + "page2.html");
  });
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}
