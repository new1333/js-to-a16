const babelParser = require("@babel/parser");
const babelTraverse = require("@babel/traverse").default;

const code = `
  function sum(a, b) {
    var result = 0 
    result = a + b
    return result 
  }
`;

const ast = babelParser.parse(code);

babelTraverse(ast, {
  enter(path) {
    console.log(path);
  },
});
