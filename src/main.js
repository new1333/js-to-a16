const babelParser = require("@babel/parser");
const babelTraverse = require("@babel/traverse").default;

const code = `
function sum(aaa, b) {
  var result = 0  
  result = a + b 
  return result 
}
`;

function compile() {
  console.log("compile");
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
          push(`.var2${param.name}`);
        });
      }
      if (path.isVariableDeclaration()) {
        const node = path.node;
      }
    },
  });
  return a16Codes.join("\n");
}

module.exports = compile;
