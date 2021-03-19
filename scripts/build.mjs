import manifest from "../src/manifest.mjs";
import esbuild from "esbuild";
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmdirSync,
} from "node:fs";
import sites from "../src/sites.mjs";
import { dirname } from "path";

const dist = "dist";

const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

function buildSitesCss() {
  const template = readFileSync("src/font.css", "utf-8");
  const sitesCss = [];

  for (const id in sites) {
    const { selector, prefix } = sites[id];
    const matches = prefix.map((prefix) => `${prefix}*`);

    const filename = `css/${id}.css`;
    const filenameWritten = `${dist}/${filename}`;

    ensureDir(dirname(filenameWritten));

    writeFileSync(
      filenameWritten,
      template.replace("selector {", `${selector} {`)
    );

    sitesCss.push([matches, filename]);
  }

  return sitesCss;
}

function buildManifestJson(sitesCss) {
  const manifestJson = JSON.stringify(
    manifest({ ...packageJson, sitesCss }),
    /* replacer */ undefined,
    /* spaces */ 2
  );

  ensureDir(dist);
  writeFileSync(`${dist}/manifest.json`, manifestJson);
}

function buildScript(name) {
  esbuild.buildSync({
    bundle: true,
    entryPoints: [`src/${name}.mjs`],
    outfile: `${dist}/${name}.js`,
  });
}

async function buildHtml(name) {
  const tmp = `${dist}/tmp`;

  const temporaryGenerator = `${tmp}/${name}-generator.mjs`;

  esbuild.buildSync({
    entryPoints: [`src/${name}.jsx`],
    outfile: temporaryGenerator,
    bundle: true,
    format: "esm",
    inject: ["src/ui/render-to-string.mjs"],
    loader: { ".css": "text" },
  });

  const temporaryRunner = `${tmp}/${name}-runner.mjs`;

  writeFileSync(temporaryRunner, "run();");

  esbuild.buildSync({
    entryPoints: [temporaryRunner],
    outfile: `${dist}/${name}.js`,
    bundle: true,
    minify: true,
    format: "iife",
    inject: [temporaryGenerator],
  });

  const { Html } = await import(`../${temporaryGenerator}`);

  const html =
    "<!DOCTYPE html>\n" +
    Html({
      name: packageJson.name,
      version: packageJson.version,
    });

  writeFileSync(`${dist}/${name}.html`, html);

  rmdirSync(tmp, { recursive: true });
}

ensureDir(dist);

buildManifestJson(buildSitesCss());
buildScript("background");
buildHtml("ui/on-install");
