// RankOnAI JV Page — Script (Launchpad launch · 7 June 2026)

// ── LUCIDE ICONS ──
lucide.createIcons();

// ── SCROLL REVEAL ──
(function () {
  // Elements to reveal individually
  const solo = [
    '.section-tag', '.section-title', '.section-sub',
    '.hero-cta', '.hero-sub',
    '.cta-card', '.cta-card-title',
    '.product-cover', '.product-text',
    '.step-block', '.timeline-item',
    '.feature-card', '.stat-card',
    '.funnel-block', '.prize-card', '.prize-total-banner',
    '.video-slot',
    '.reciprocate-img', '.reciprocate-quote',
    '.connect-card',
    '.faq-item',
    '.footer-inner',
  ].join(', ');

  document.querySelectorAll(solo).forEach((el, i) => {
    el.classList.add('reveal');

    // Stagger siblings in the same grid/row
    const parent = el.parentElement;
    const siblings = parent ? [...parent.children].filter(c => c.classList.contains(el.classList[0])) : [];
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
  });

  // Hero pill rows — stagger each pill
  document.querySelectorAll('.hero-pill').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.07}s`;
  });

  // AI logos — stagger
  document.querySelectorAll('.ai-logo-wrap').forEach((el, i) => {
    el.classList.add('reveal', 'reveal-scale');
    el.style.transitionDelay = `${i * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ── STEP CONNECTOR ARROWS ──
function drawStepConnector() {
  const flow  = document.querySelector('.steps-flow');
  const cards = flow.querySelectorAll('.step-block');
  if (cards.length < 3) return;

  const old = document.getElementById('step-connector');
  if (old) old.remove();

  const fr = flow.getBoundingClientRect();
  const c1 = cards[0].getBoundingClientRect();
  const c2 = cards[1].getBoundingClientRect();
  const c3 = cards[2].getBoundingClientRect();
  const W  = fr.width;
  const H  = fr.height;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg   = document.createElementNS(svgNS, 'svg');
  svg.id = 'step-connector';
  svg.setAttribute('style', `position:absolute;top:0;left:0;width:${W}px;height:${H}px;pointer-events:none;z-index:10;overflow:visible;`);

  // Shared defs (marker + glow) used by both mobile and desktop paths
  const sharedDefs = `
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M1,1 L7,4 L1,7" stroke="#ff55a7" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <filter id="aglow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;

  if (window.innerWidth <= 768) {
    // ── Mobile: simple vertical downward arrows centred between cards ──
    const cx  = W / 2;
    const m1y1 = c1.bottom - fr.top + 8;
    const m1y2 = c2.top    - fr.top - 8;
    const m2y1 = c2.bottom - fr.top + 8;
    const m2y2 = c3.top    - fr.top - 8;

    svg.innerHTML = `
      <defs>
        ${sharedDefs}
        <linearGradient id="mg1" x1="${cx}" y1="${m1y1}" x2="${cx}" y2="${m1y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#ff55a7" stop-opacity="0"/>
          <stop offset="40%"  stop-color="#ff55a7" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#ff55a7" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="mg2" x1="${cx}" y1="${m2y1}" x2="${cx}" y2="${m2y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#ff55a7" stop-opacity="0"/>
          <stop offset="40%"  stop-color="#ff55a7" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#ff55a7" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <path d="M ${cx},${m1y1} L ${cx},${m1y2}"
        stroke="url(#mg1)" stroke-width="1.5" stroke-dasharray="6 4" fill="none"
        stroke-linecap="round" filter="url(#aglow)" marker-end="url(#arr)"/>
      <path d="M ${cx},${m2y1} L ${cx},${m2y2}"
        stroke="url(#mg2)" stroke-width="1.5" stroke-dasharray="6 4" fill="none"
        stroke-linecap="round" filter="url(#aglow)" marker-end="url(#arr)"/>
    `;

  } else {
    // ── Desktop: zigzag curved arrows ──
    const a1x1 = c1.left + c1.width  * 0.25 - fr.left;
    const a1y1 = c1.bottom - fr.top + 8;
    const a1y2 = c2.top  + c2.height * 0.3  - fr.top;
    const a1x2 = c2.left - fr.left   - 8;

    const a2x1 = c2.left + c2.width  * 0.75 - fr.left;
    const a2y1 = c2.bottom - fr.top + 8;
    const a2y2 = c3.top  + c3.height * 0.3  - fr.top;
    const a2x2 = c3.right - fr.left  + 8;

    svg.innerHTML = `
      <defs>
        ${sharedDefs}
        <linearGradient id="ag1" x1="${a1x1}" y1="${a1y1}" x2="${a1x2}" y2="${a1y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#ff55a7" stop-opacity="0"/>
          <stop offset="30%"  stop-color="#ff55a7" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#ff55a7" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="ag2" x1="${a2x1}" y1="${a2y1}" x2="${a2x2}" y2="${a2y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#ff55a7" stop-opacity="0"/>
          <stop offset="30%"  stop-color="#ff55a7" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#ff55a7" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <path d="M ${a1x1},${a1y1} C ${a1x1},${a1y1+(a1y2-a1y1)*0.7} ${a1x1+(a1x2-a1x1)*0.4},${a1y2} ${a1x2},${a1y2}"
        stroke="url(#ag1)" stroke-width="1.5" stroke-dasharray="6 4" fill="none"
        stroke-linejoin="round" stroke-linecap="round"
        filter="url(#aglow)" marker-end="url(#arr)"/>
      <path d="M ${a2x1},${a2y1} C ${a2x1},${a2y1+(a2y2-a2y1)*0.7} ${a2x1+(a2x2-a2x1)*0.4},${a2y2} ${a2x2},${a2y2}"
        stroke="url(#ag2)" stroke-width="1.5" stroke-dasharray="6 4" fill="none"
        stroke-linejoin="round" stroke-linecap="round"
        filter="url(#aglow)" marker-end="url(#arr)"/>
    `;
  }

  flow.appendChild(svg);
}

window.addEventListener('load', drawStepConnector);
let _arrowResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_arrowResizeTimer);
  _arrowResizeTimer = setTimeout(drawStepConnector, 150);
});

// ── FAQ ACCORDION ──
const faqs = [
  { q: 'What is RankOnAI?', a: 'An all-in-one SaaS platform for Generative Engine Optimization (GEO). It measures every AI bot crawl and AI-referred visit, runs a deterministic 7-pillar audit on every page with a 0–100 GEO score, rewrites pages with AI to add FAQs, Answer Capsules and JSON-LD schema, surfaces content gaps and keyword opportunities, tracks competitors and citations, and includes a full agency suite with white-label PDF reports, client CRM, invoicing and sales templates. Works on any site via a one-line tracking script, a native WordPress plugin, or long-lived API keys.' },
  { q: 'Who is the target audience?', a: 'Three high-value buyer segments: (1) founders and in-house marketers who suspect they\'re invisible in AI answers and want a measurable plan, (2) SEO agencies and consultants who need a new service line to sell — the agency suite turns it into a billable retainer from day one, and (3) developers and integration builders who want to plug RankOnAI into existing stacks via API or WordPress.' },
  { q: 'What are the commission rates?', a: '50% across the entire funnel — front-end, Order Bump, every OTO, and the Bundle. Maximum per customer is $451 on the full ascension (FE + Order Bump + Pro + AutoPilot annual + Agency + Reseller = $902 cart). The Bundle pays $98.50 instantly with zero further upsells needed. AutoPilot subscribers generate recurring commissions for the affiliate.' },
  { q: 'What is the Bundle deal?', a: 'The RankOnAI All-Access Bundle is $197 one-time and includes Starter (FE), GEO Booster Pack (OB), Pro (OTO 1), Agency (OTO 3), and a full 12 months of AutoPilot (then it expires) — the whole core toolkit for the price of Agency alone. That\'s $605 of standalone value for $197 — a $408 saving (~67% off). It\'s the primary conversion vehicle of this funnel. Affiliates can promote the Bundle URL directly for $98.50 commission per sale with no further upsells needed.' },
  { q: 'How does affiliate tracking work?', a: 'RankOnAI is launching on Launchpad with standard affiliate cookie tracking. Click your affiliate link above to grab your link and join the JV list.' },
  { q: 'When does the cart close?', a: 'The cart closes on June 12, 2026 at 11:59 PM EST — a 5-day launch window. Use scarcity in your final emails for maximum conversions on closing night.' },
  { q: 'Is there a webinar I can promote?', a: 'Yes. The live webinar runs on June 7 at 10:00 AM EST — one hour before cart open. Webinar attendees convert at significantly higher rates. Registration links and webinar swipes will be in the JV Doc.' },
  { q: 'Does AutoPilot work for non-WordPress sites?', a: 'Yes. AutoPilot runs scheduled audits in the cloud and auto-generates rewrites, llms.txt refreshes, alerts and weekly digests for any site — delivered to email or webhook (Zapier / Make / n8n). The WordPress-only bonus on top is direct auto-apply of rewrites & schema via the plugin. Non-WP buyers save the manual generation work; they still do the final paste — but everything up to that point is automated.' },
  { q: 'What about AI costs — is AI usage included?', a: 'RankOnAI is provider-agnostic — customers connect their own OpenAI or Anthropic API key in Account settings. AI usage is billed directly to their chosen provider, which keeps RankOnAI pricing transparent and predictable (no AI-tax markup) and gives users full control of their AI spend. This is a benefit, not a hurdle — but worth mentioning honestly in your swipes if asked.' },
  { q: 'What marketing materials are available?', a: 'A full JV Doc and a complete email swipe file are ready right now in the resources section above — grab them anytime. Additional creatives (banners and social posts) land closer to launch. Click "Get Affiliate Link" to grab your link and stay in the loop.' },
  { q: 'How do I contact the JV team?', a: 'Reach out to Himanshu Mehta directly via Microsoft Teams, Facebook, or WhatsApp — details in the Connect section above.' },
];

const faqList = document.getElementById('faq-list');
if (faqList) {
  faqs.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)">
        <span>${item.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a">${item.a}</div>
    `;
    faqList.appendChild(el);
  });
}

function toggleFaq(btn) {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  document.querySelectorAll('.faq-q').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.querySelector('.faq-icon').textContent = '+';
    b.nextElementSibling.style.maxHeight = null;
  });
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    btn.querySelector('.faq-icon').textContent = '×';
    btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
  }
}

// ── STICKY NAV ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('geo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'geo-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('toast-show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('toast-show'), 3000);
}

// ── COMING SOON LINKS ──
document.querySelectorAll('.cta-resource-card[href="#"], .nav-coming-soon').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showToast('Coming soon — check back closer to launch!');
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
