# LC Gutenberg Support

Opinionated Gutenberg button block that keeps styles consistent across the editor and the frontend.

## Features

- Simple options: Size (sm/rg/lg), Full width, optional icons
- Styles: Primary (default), Secondary, Outline, Information
- Link controls: URL, open in new tab, `rel=nofollow` / `rel=sponsored`
- Editor ↔ Frontend parity: selected style persists and matches the frontend

## Quick Start

1. Install the plugin
   - Upload the zip in WP Admin → Plugins → Add New → Upload
   - or copy this folder to `wp-content/plugins/` and activate
2. In the editor, insert “LC Button”, set text and URL
3. Choose:
   - Style: Primary, Secondary, Outline, Information (via block Styles)
   - Size: Small, Regular, or Large (sm/rg/lg)
   - Full width if needed

## Development

From the plugin folder (`wp-content/plugins/lc-gutenberg-support`):

```bash
npm install          # once
npm start            # watch + rebuild while developing
npm run build        # production build to /build
npm run plugin-zip   # create a distributable zip one level up
```

This repo commits the compiled `build/` output so sites can install without Node.

### Add a new style preset

1. Add CSS rules in `src/lc-gutenberg-support/style.scss`
2. Register the style in `src/lc-gutenberg-support/block.json` under the `styles` array
3. `npm run build`

The wrapper receives classes like:

- `lc-button` (base)
- `lc-button--{size}` e.g. `lc-button--rg`
- `lc-button--{style}` e.g. `lc-button--primary`, `lc-button--outline`
- Helpers: `is-full`, `has-icon`, `has-icon-left|right`

## FAQ

**My button reverts to Style 1 after reload**  
Fixed: chosen styles now persist on save and render the same on the frontend. If upgrading from an older version, re-select the style once and save.

**Can I override colors in my theme?**  
Yes, override the wrapper class, e.g.:

```css
.lc-button.lc-button--style-2.is-solid a {
  background: var(--brand, #2563eb);
}
```

## License

GPL-2.0-or-later

## Support

Open an issue: https://github.com/anjobarros/lc-button-support/issues
