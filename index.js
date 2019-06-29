const express = require("express");
const path = require("path");

const PORT = parseInt(process.env.PORT) || 3000;
const pathStatic = path.join(__dirname,"public/")
main();

function main() {
  const app = express();
  
  app.get("/",(req,res) => {
    res.sendFile(pathStatic + "page1.html")
  })
  app.get("/2",(req,res) => {
    res.sendFile(pathStatic + "page2.html")
  })
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}
