# JSX builds HTML

We use JSX only to generate an HTML string. **It does _not_ run in the browser**.

Each entry point exports `{Html, run}`:

- `Html()` uses JSX and generates an HTML file on build time.

- `run()` executes on the browser and should **not** use JSX.
