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

let a16Codes = [];

function push(str) {
  a16Codes.push(str);
}

babelTraverse(ast, {
  enter(path) {
    if (path.isFunctionDeclaration()) {
      const node = path.node;
      const {
        params,
        id: { name: functionName },
      } = node;
      push(`@${functionName}`);
      params.forEach((param) => {
        push(`.var2 ${param.name}`);
      });
    }
    if (path.isVariableDeclaration()) {
      const node = path.node;
      const {
        params,
        id: { name: varName },
      } = node;
    }
  },
});

console.log(a16Codes);
