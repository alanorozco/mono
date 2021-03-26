export default {
  astexplorer: {
    prefix: ["https://astexplorer.net/"],
    selectors: [
      "pre",
      "code",
      ".Code",
      "#Toolbar",
      ".tree-visualization > ul",
      ".CodeMirror",
    ],
  },

  bitbucket: {
    prefix: ["https://bitbucket.org/"],
    selectors: ["pre.source", ".highlight pre"],
  },

  github: {
    prefix: ["https://github.com/", "https://gist.github.com/"],
    selectors: [
      "code",
      "pre",
      "tt",
      ".highlight pre",
      ".highlight .blob-code-inner",
    ],
  },

  jsbin: {
    prefix: ["https://jsbin.com/"],
    selectors: ["#bin .editbox .CodeMirror pre", ".mobile .editbox textarea"],
  },

  mdn: {
    prefix: ["https://developer.mozilla.org/"],
    selectors: ["pre", "code"],
  },
};
