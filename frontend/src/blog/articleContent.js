import { parseFragment, serialize } from "parse5";
export const articleContent = (value = "") => {
  const fragment = parseFragment(value);
  const toc = [];
  const textOf = (node) =>
    node.nodeName === "#text"
      ? node.value
      : (node.childNodes || []).map(textOf).join("");
  const visit = (node) => {
    if (node.attrs) {
      node.attrs = node.attrs.filter(
        (attr) =>
          !/^on/i.test(attr.name) &&
          !/^(?:javascript|vbscript):/i.test(attr.value.trim()),
      );
      if (node.tagName === "h1") node.tagName = node.nodeName = "h2";
      if (["h2", "h3"].includes(node.tagName)) {
        const existing = node.attrs.find((attr) => attr.name === "id");
        const id = existing?.value || `heading-${toc.length}`;
        if (!existing) node.attrs.push({ name: "id", value: id });
        toc.push({ id, text: textOf(node), level: node.tagName });
      }
    }
    if (node.childNodes) {
      node.childNodes = node.childNodes.filter(
        (child) =>
          !["script", "style", "object", "embed"].includes(child.tagName),
      );
      node.childNodes.forEach(visit);
    }
  };
  visit(fragment);
  return { html: serialize(fragment), toc };
};
