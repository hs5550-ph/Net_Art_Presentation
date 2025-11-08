(() => {
  function insertStyles() {
    if (document.getElementById('revolve')) return;
    const css = `
      .panel-card.revolve {
        position: relative; /* allow bubble absolute positioning */
        animation: revolve-rotate 20s linear infinite;
        transform-origin: center center;
      }

      @keyframes revolve-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* bubble that sits on the panel image */
      .panel-card .revolve-bubble {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(26,115,232,0.95);
        color: white;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        pointer-events: none;
      }
    `;
    const style = document.createElement('style');
    style.id = 'revolve';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    insertStyles();
    const panel = document.querySelector('.panel-card');
    const body = document.querySelector("body");

    panel.classList.add('revolve');

      let hue = 0;
      const imgs = Array.from(document.querySelectorAll('img'));
      const timeInterval = 50; 
      const interval = setInterval(() => {
        hue = (hue + 2) % 360;
       
        const filter = `hue-rotate(${hue}deg) saturate(1.05)`;
        panel.style.filter = filter;
        imgs.forEach(img => { img.style.filter = filter; });
        body.style.background = `linear-gradient(120deg, hsl(${hue} 60% 95%), hsl(${(hue + 60) % 360} 60% 92%))`;
      }, timeInterval);

    // cleanup 
    window.addEventListener('beforeunload', () => clearInterval(interval));
  });
})();