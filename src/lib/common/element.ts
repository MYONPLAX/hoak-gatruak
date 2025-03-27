const sanitise = (children: string): string =>
  children.replaceAll('<', '&gt;').replaceAll('>', '&lt;');

const addElement = (e: string, c: string, s: boolean): string =>
  `<${e}>${s ? sanitise(c) : c}</${e}>`;

/**
 * // add <a> tag
 * @param h link (href)
 * @param c content (text)
 * @param n new tab (target)
 * @returns <a> tag
 */
const addLink = (h: string, c: string, n: boolean): string => {
  const attr = n
    ? `referrerpolicy="strict-origin-when-cross-origin" rel="noopener" target="_blank"`
    : `referrerpolicy="strict-origin-when-cross-origin" rel="noopener"`;
  return `<a href="${h}" ${attr}>${c}</a>`;
};

/**
 * Make function to create element
 * @param e Element
 * @param s Sanitise
 * @returns createAddElement
 */
const createAddElement =
  (e: string, s: boolean) =>
  (c: string): string =>
    addElement(e, c, s);

// <p>, <span>
export const addParagraph = createAddElement('p', false);
export const addSpan = createAddElement('span', false);

// <strong>, <em>
export const addStrong = createAddElement('strong', false);
export const addEmphasized = createAddElement('em', false);

// <pre>, <code>
export const addPre = createAddElement('pre', false);
export const addCode = createAddElement('code', true);

// anchor <a>
export const addExtAnchor = (text: string, link: string): string =>
  addLink(link, text, true);

export const addIntAnchor = (text: string, link: string): string =>
  addLink(link, text, false);

// list <ul>, <li>
export const addUl = createAddElement('ul', false);
export const addLi = createAddElement('li', false);

// <ol>
export const addOl = (c: string, s?: string): string => {
  s = s ? `style="list-style-type: ${s}"` : '';
  return `<ol ${s}>${c}</ol>`;
};

// join list <li>
export const joinList = (list: string[]): string =>
  list.map((text) => addLi(text)).join('');
