(function injectWeavelyJsonLd() {
  function ready(fn){ 
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var nodes = document.querySelectorAll('.weavely-jsonld');
    if (!nodes.length) {
      console.info('[Weavely JSON-LD] No blocks found on this page.');
      return;
    }

    nodes.forEach(function (el, idx) {
      try {
        var raw = (el.textContent || '').trim();
        if (!raw) {
          console.warn('[Weavely JSON-LD] Empty block at index', idx);
          return;
        }

        // Validate JSON before injecting
        var parsed = JSON.parse(raw);

        var s = document.createElement('script');
        s.type = 'application/ld+json';
        s.text = JSON.stringify(parsed);
        document.head.appendChild(s);

        console.info('[Weavely JSON-LD] injected block', idx + 1);
      } catch (e) {
        console.warn('[Weavely JSON-LD] parse/inject error at block', idx + 1, e);
      }
    });
  });
})();