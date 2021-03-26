module.exports = function (context) {
  const selectorSelector =
    'Property[key.type="Identifier"]' + '[key.name="selectors"]';
  console.log(context);
  return {
    [`${selectorSelector} > Literal`]: function (node) {
      context.report({
        node,
        message: "should be array",
        fix: function* (fixer) {
          yield fixer.insertTextBefore(node, "[");
          yield fixer.insertTextAfter(node, "]");
        },
      });
    },
    [`${selectorSelector} > ArrayExpression > ArrayExpression`]: function (
      node
    ) {
      context.report({
        node,
        message: "put items in top-level",
        fix: function* (fixer) {
          const { start, end } = node;
          yield fixer.replaceTextRange([start, start + 1], "");
          yield fixer.replaceTextRange([end - 1, end], "");
        },
      });
    },
    [`${selectorSelector} > ArrayExpression > Literal`]: function (node) {
      const { value } = node;
      if (value.indexOf(",") < 0) {
        return;
      }
      context.report({
        node,
        message: "split selector into array",
        fix: function* (fixer) {
          const result = value.match(/\s*,\s*/);
          const [match] = result;
          const start = node.start + result.index + 1;
          const end = start + match.length;
          const quote = context.getSourceCode().getText(node)[0];
          yield fixer.replaceTextRange([start, end], `${quote},${quote}`);
        },
      });
    },
  };
};
