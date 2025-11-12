(function () {
  console.log("✅ JSON-LD test script running…");

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this JSON-LD being detected by search engines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This JSON-LD was injected dynamically via JavaScript to test if Googlebot renders and indexes it correctly."
        }
      },
      {
        "@type": "Question",
        "name": "When was this script inserted?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It was inserted on DOMContentLoaded into the <head> element using JavaScript."
        }
      }
    ]
  };

  // Create <script type="application/ld+json">
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data, null, 2);

  // Append to <head>
  document.head.appendChild(script);
  console.log("✅ JSON-LD injected:", data);
})();