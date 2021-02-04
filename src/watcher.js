const fs = require("fs");
const path = require("path");

const inputFile = "./main.js";
const output = "./code.a16";

let count = 0;

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

fs.watch(path.resolve(__dirname, inputFile), { interval: 1000 }, () => {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, output),
      requireUncached("./main.js")()
    );
  } catch (error) {}
});
