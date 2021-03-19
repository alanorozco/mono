// https://developer.chrome.com/docs/extensions/mv3/manifest/

export default function ({ name, version, description, sitesCss }) {
  return {
    manifest_version: 2,
    name,
    version,
    description,
    permissions: [],
    host_permissions: sitesCss.map(([matches]) => matches).flat(),
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
