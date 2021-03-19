// https://developer.chrome.com/docs/extensions/mv3/manifest/

export default function ({ name, version, description, sitesCss }) {
  return {
    manifest_version: 2,
    name,
    version,
    description,
    icons: {
      48: "icon/48.png",
      128: "icon/128.png",
    },
    permissions: [],
    optional_permissions: sitesCss.map(([matches]) => matches).flat(),
    content_scripts: sitesCss.map(([matches, filename]) => ({
      matches,
      css: [filename],
      run_at: "document_start",
    })),
    background: {
      scripts: ["background.js"],
      persistent: false,
    },
  };
}
