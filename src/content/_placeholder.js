// Every fact on the site is wrapped so the build knows whether it is real.
//
//   R(value, source)  — verified. Renders plainly.
//   P(value, note)    — placeholder. Renders with a visible marker and is
//                       listed in the "needs Shawna" report at build time.
//
// The point: you cannot forget to label an invented figure, and swapping a
// placeholder for the real thing is one edit that reaches every mockup.

export const R = (value, source = '') => ({ value, placeholder: false, source });
export const P = (value, note = '') => ({ value, placeholder: true, note });

/** Unwrap to the bare value. */
export const v = (f) => (f && typeof f === 'object' && 'value' in f ? f.value : f);

/** Walk any content tree and collect every placeholder, with its path. */
export function collectPlaceholders(node, path = [], out = []) {
  if (node && typeof node === 'object') {
    if ('placeholder' in node && 'value' in node) {
      if (node.placeholder) out.push({ path: path.join('.'), value: node.value, note: node.note });
      return out;
    }
    for (const [k, child] of Object.entries(node)) collectPlaceholders(child, [...path, k], out);
  }
  return out;
}
