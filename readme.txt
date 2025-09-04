=== LC Gutenberg Support ===
Contributors:      LimeCuda
Tags:              block, gutenberg, button, styles, cta
Tested up to:      6.7
Stable tag:        0.1.4
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Opinionated Gutenberg block(s) with a focus on a resilient, consistent Button component.

== Description ==

Adds an LC Button block (`limecuda/button`) with locked styling and a few safe options your content team can use without breaking consistency.

Highlights:

* Simple options: Size (sm/rg/lg), Full width, optional icons
* Styles: Primary (default), Secondary, Outline, Information
* Link controls: URL, open in new tab, rel=nofollow / rel=sponsored
* Editor ↔ Frontend parity: your selected style persists on save and matches the site

== Installation ==

There are two easy ways to install.

1) Upload the zip in WP Admin (Plugins → Add New → Upload Plugin)

* Download a release zip from GitHub, or make one locally with `npm run plugin-zip` from this plugin folder.
* Upload the zip and activate.

2) Copy the folder to your site

* Copy `lc-gutenberg-support` into `wp-content/plugins/` on your site.
* Activate “LC Gutenberg Support” in WP Admin → Plugins.

Requirements: WordPress 6.7+, PHP 7.4+.

== Usage ==

1. In the editor, insert “LC Button”.
2. Enter the button text and URL.
3. In the sidebar:
   - Styles: Primary, Secondary, Outline, Information (via block Styles)
   - Size: Small, Regular, Large (sm/rg/lg)
   - Full width: make the button span its container
   - Link options: New tab, rel=nofollow, rel=sponsored

Tips:

* Style 1 is the default and applied even if WordPress doesn’t add a style class
* The chosen Style adds a class to the wrapper (e.g. `lc-button--style-2`) so the frontend always matches the editor

== Blocks ==

=== limecuda/button ===
LC Button provides a consistent, theme-agnostic call‑to‑action with size, outline, and style presets.

== Development ==

From the plugin folder (`wp-content/plugins/lc-gutenberg-support`):

* `npm install` — install dev dependencies (needed only if you change the source).
* `npm start` — run the build in watch mode while you edit files in `src/`.
* `npm run build` — create a production build in `build/`.
* `npm run plugin-zip` — create a distributable zip in the parent directory.

This repository commits the `build/` output so sites can install the plugin without Node.

== Frequently Asked Questions ==

= My button reverts to Style 1 when I reload =

That should now be fixed. The selected style is saved and reflected on the frontend and in the editor. If you migrated from an older version, re-select the style once and save.

= Can I add new style presets? =

Yes. Add a new style to `src/lc-gutenberg-support/style.scss` and register a style in `src/lc-gutenberg-support/block.json` under `"styles"`. Rebuild with `npm run build`.

= Can I override colors in my theme? =

Yes. Target the wrapper classes in your theme stylesheet, for example:

`.lc-button.lc-button--style-2.is-solid a { background: var(--brand, #2563eb); }`

== Screenshots ==

1. Style presets in the editor sidebar.
2. Solid and outline variations on the frontend.

== Changelog ==

= 0.1.4 =
* Default size changed to `rg` (was `md`); added CSS alias so old `lc-button--md` still looks correct
* Removed Outline/Disabled toggles from the Inspector; choose Outline via Styles panel instead
* Updated docs and fixed typos; refreshed build output

= 0.1.0 =
* Initial release of LC Button block

== Support ==

Open an issue on GitHub: https://github.com/anjobarros/lc-button-support/issues
