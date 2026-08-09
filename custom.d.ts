/**
 * Ambient declarations for non-code assets imported by the app.
 *
 * Next.js ships types for `*.module.css` (CSS Modules) but not for plain
 * stylesheet side-effect imports like `import "./globals.css"`. TypeScript
 * 5.6 added `noUncheckedSideEffectImports`, which some editors enable ahead
 * of the version pinned in package.json — that reports the import as an
 * error even though the build succeeds. Declaring the modules here keeps
 * the editor and the build in agreement.
 *
 * Do not declare `*.module.css` here: Next.js already types it as a record
 * of class names, and redeclaring it would discard that.
 */
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
