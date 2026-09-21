/* Gil & Go — translates belt / tab / category labels on screen.
   Needs gilgo-category-i18n.js loaded first. Does not change any other file.
   Watches the page, so it also works when the sidebar is rebuilt
   (belt switch, new search) and when the user changes language. */

(function () {
  if (typeof GILGO_I18N === 'undefined') {
    console.warn('category-translate: gilgo-category-i18n.js not loaded');
    return;
  }

  const SKIP = { SCRIPT:1, STYLE:1, TEXTAREA:1, INPUT:1, NOSCRIPT:1 };
  const memory = new WeakMap(); // text node -> { pre, en, suf, shown }

  function getLang() {
    try { if (typeof currentLang !== 'undefined' && currentLang) return currentLang; } catch (e) {}
    try { return localStorage.getItem('gilgo_lang') || 'en'; } catch (e) { return 'en'; }
  }

  // "🏨 Hotels 12" -> pre "🏨 ", core "Hotels", suf " 12"
  function split(text) {
    const m = text.match(/^([^A-Za-z]*)(.*?)([\s\d()·]*)$/s);
    return m ? { pre: m[1], core: m[2], suf: m[3] } : null;
  }

  function translateNode(node, lang) {
    const val = node.nodeValue;
    if (!val || !val.trim()) return;

    let rec = memory.get(node);
    if (!rec || rec.shown !== val) {
      // New node, or the app rewrote it: read the English again
      const p = split(val);
      if (!p || !GILGO_I18N[p.core]) { memory.delete(node); return; }
      rec = { pre: p.pre, en: p.core, suf: p.suf };
    }

    const label = (lang === 'en') ? rec.en : ((GILGO_I18N[rec.en] || {})[lang] || rec.en);
    const out = rec.pre + label + rec.suf;
    rec.shown = out;
    memory.set(node, rec);
    if (node.nodeValue !== out) node.nodeValue = out;
  }

  function run() {
    const lang = getLang();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentNode && SKIP[n.parentNode.nodeName])
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let n;
    while ((n = walker.nextNode())) translateNode(n, lang);
  }

  let timer = null;
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(run, 80);
  }

  function start() {
    run();
    new MutationObserver(schedule).observe(document.body, {
      childList: true, subtree: true, characterData: true
    });
    document.addEventListener('languagechange', schedule);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
