(function () {
  const html = document.body.innerHTML;
  const regex = /\{\/\*\s*JSON-LD-START([\s\S]*?)JSON-LD-END\s*\*\/\}/m;
  const match = html.match(regex);
  console.log("Match? " + match);
  if (match && match[1]) {
    try {
      const json = match[1].trim();
      const data = JSON.parse(json);
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      console.info('[Weavely JSON-LD] injected');
    } catch (e) {
      console.warn('[Weavely JSON-LD] parse error', e);
    }
  }
})();