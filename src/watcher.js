const fs = require("fs");
const path = require("path");

const inputFile = "./main.js";
const output = "./code.a16";

let count = 0;
fs.watchFile(path.resolve(__dirname, inputFile), { interval: 1000 }, () => {
  fs.writeFileSync(path.resolve(__dirname, output), count++);
});
