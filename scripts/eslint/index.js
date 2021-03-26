const { readdirSync } = require("fs");
const { basename } = require("path");

const rules = {};

for (const filename of readdirSync(`${__dirname}/rules`)) {
  if (/^[^_].*\.js$/.test(filename)) {
    const name = basename(filename, ".js");
    const create = require(`./rules/${filename}`);
    rules[name] = { create };
  }
}

module.exports = { rules };
