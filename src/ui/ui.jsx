import css from "./ui.css";

export function Body({ name, children, ...rest }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <title>{name}</title>
        <style type="text/css">{css}</style>
      </head>
      <body {...rest}>
        <div class="wrapper">{children}</div>
      </body>
    </html>
  );
}
