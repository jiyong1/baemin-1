export default function (node, info) {
  for (const [key, value] of Object.entries(info)) {
    node.setAttribute(key, value);
  }
  return node;
}