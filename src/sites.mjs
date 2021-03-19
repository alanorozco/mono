export default {
  astexplorer: {
    prefix: ["https://astexplorer.net/"],
    selector: ".Code, #Toolbar, .tree-visualization > ul, .CodeMirror",
  },

  bitbucket: {
    prefix: ["https://bitbucket.org/"],
    selector: "pre.source, .highlight pre",
  },

  github: {
    prefix: ["https://github.com/", "https://gist.github.com/"],
    selector: "code, pre, tt, .highlight pre, .highlight .blob-code-inner",
  },

  mdn: {
    prefix: ["https://developer.mozilla.org/"],
    selector: "code",
  },
};
