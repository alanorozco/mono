const selfClosing = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};

function mergeChildren(children) {
  return children
    .map((child) => (Array.isArray(child) ? mergeChildren(child) : child))
    .join("");
}

function serializeAttributes(tag, attributes) {
  if (!attributes) {
    return "";
  }
  return (
    " " +
    Object.entries(attributes)
      .map(([key, value]) =>
        value === false
          ? ""
          : `${key}="${value === true ? "" : value.replace(/"/g, '\\"')}"`
      )
      .join(" ")
  );
}

function createElement(tag, attributes, ...children) {
  if (typeof tag === "function") {
    return tag({ ...attributes, children });
  }
  if (attributes && "children" in attributes) {
    children = (children || []).concat(attributes["children"]);
    delete attributes["children"];
  }
  const openingElement = tag + serializeAttributes(tag, attributes);
  if (selfClosing[tag]) {
    if (children && children.length) {
      throw new Error(`${tag} is self-closing and should not contain children`);
    }
    return `<${openingElement} />`;
  }
  return `<${openingElement}>${mergeChildren(children)}</${tag}>`;
}

export const React = { createElement };
