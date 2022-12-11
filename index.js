const express = require("express");
const upload = require("express-fileUpload");
const fs = require("fs");
const { calc } = require("./resolver");
let alert = require("alert");

const app = express();
app.use(upload());
const PORT = 3000;
let filename;

function render() {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
}
function getFileName() {
  app.post("/", (req, res) => {
    if (req.files) {
      console.log(req.files);
      var file = req.files.file;
      filename = file.name;
      console.log(filename);
      calc(filename);
      setTimeout(() => {
        res.sendFile(__dirname + "/download.html");
      }, 3000);
    } else {
      res.send("upload the files first");
    }
  });
}

function download() {
  app.get("/download", function (req, res) {
    const file = `out.${filename}`;
    const path = `out.${filename}`;

    console.log(path);
    if (fs.existsSync(path)) {
      res.download(file);
    } else {
      res.sendFile(__dirname + "/download.html");
      alert("File not converted");
    }
  });
}

render();
getFileName();
download();

app.listen(PORT, () => {
  console.log(`LISTENING OF ${PORT}`);
});

module.exports = filename;
