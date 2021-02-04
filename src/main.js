const babelParser = require("@babel/parser");
const babelTraverse = require("@babel/traverse").default;

function compile() {
  const code = `

    function sum(a, b) {
      var result 
      result = a + b 
      return result  
    }

    function main() {
      var x = 5
      var y = 10
      sum(x, y)
    }
  `;
  console.log("compile");
  const ast = babelParser.parse(code);

  let a16Codes = [];

  function push(str) {
    a16Codes.push(str);
  }

  babelTraverse(ast, {
    enter(path) {
      const node = path.node;

      if (path.isFunctionDeclaration()) {
        const {
          params,
          id: { name: functionName },
        } = node;
        push(`@${functionName}`);
        params.forEach((param) => {
          push(`.var2 ${param.name}`);
        });
      }
      if (path.isVariableDeclarator()) {
        const { id, init } = node;
        const varName = id.name;
        const varValue = init && init.value;
        if (varValue != null) {
          push(`.var2 ${varName} ${varValue}`);
        } else {
          push(`.var2 ${varName} `);
        }
      }
      if (path.isAssignmentExpression()) {
        const destName = node.left.name;
        const varName1 = node.right.left.name;
        const varName2 = node.right.right.name;
        const op = node.right.operator;

        console.log({ destName, varName1, varName2, op });
      }
    },
  });
  return a16Codes.join("\n");
}

module.exports = compile;
