(function () {
  var INJECTED = new WeakSet();

  function injectFromSpan(span) {
    if (!span || INJECTED.has(span)) return false;
    try {
      var raw = span.textContent.trim();
      // Allow either raw JSON or backticked string in MDX
      if ((raw.startsWith('`') && raw.endsWith('`')) || (raw.startsWith('{`') && raw.endsWith('`}'))) {
        raw = raw.replace(/^`|`$/g, '');
      }
      var json = JSON.parse(raw);
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(json);
      s.setAttribute('data-weavely-jsonld', 'true');
      document.head.appendChild(s);
      INJECTED.add(span);
      return true;
    } catch (e) {
      console.warn('[Weavely JSON-LD] Failed to parse', e, { snippet: raw?.slice(0, 120) });
      return false;
    }
  }

  function scanAndInject() {
    var spans = document.querySelectorAll('.weavely-jsonld');
    if (!spans.length) return false;
    var injectedAny = false;
    spans.forEach(function (span) { injectedAny = injectFromSpan(span) || injectedAny; });
    return injectedAny;
  }

  function observeUntilFound() {
    // Watch for content being mounted/replaced (Mintlify hydration and client-side nav)
    var obs = new MutationObserver(function () {
      if (scanAndInject()) {
        // Keep observing in case of SPA route changes; comment out to stop after first success
        // obs.disconnect();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function start() {
    // First quick attempt
    if (!scanAndInject()) {
      // If nothing yet, observe for future mounts
      observeUntilFound();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Optional: re-scan on SPA route changes if your router fires events
  window.addEventListener('hashchange', scanAndInject);
  window.addEventListener('popstate', scanAndInject);
})();