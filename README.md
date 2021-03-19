# `mono`

Use the same font for code across different sites on Chrome.

## Usage

> Install extension.

Enabled sites have their code font reset to `monospace`, so they'll respect your browser's font settings.

## Why not use Stylish?

This extension is different from [Stylish](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) (and friends) in some key ways:

- Stylish requires access to **all domains**, so you may not be able to install it on managed browser environments.

- Similarly, this extension runs on **declared hostnames**, so they can be enabled independently.

- **You don't need to write CSS**, just configure your browser's `monospace` font. Site selectors stay up-to-date.

## Development

### Build

```console
npm run build
```

### Contribute site

You may add a site and their code font selectors on [`sites.mjs`](./src/sites.mjs)

## License

MIT
