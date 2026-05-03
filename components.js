// components.js — shared nav, footer, floating WA button
const base = '/new_demo';

function injectNav(activePage = '') {
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  const links = [
    { href: isHome ? '#hero' : base + '/', label: 'Home' },
    { href: isHome ? '#about' : base + '/#about', label: 'About' },
    { href: isHome ? '#services' : base + '/#services', label: 'Services' },
    { href: isHome ? '#testimonials' : base + '/#testimonials', label: 'Testimonials' },
    { href: isHome ? '#faq' : base + '/#faq', label: 'FAQ' },
    { href: base + '/conditions.html', label: 'Conditions' },
    { href: base + '/blog.html', label: 'Blog' },
    { href: base + '/resources.html', label: 'Resources' },
  ];

  const navHTML = `
  <!-- Floating WhatsApp -->
  <a href="https://wa.me/917977396991" target="_blank" id="waFloat"
     class="fixed bottom-6 right-6 z-50 flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group">
    <i class="fa-brands fa-whatsapp text-3xl"></i>
    <span class="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">&nbsp;&nbsp;Connect on WhatsApp</span>
  </a>

  <header class="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div class="max-w-7xl 2xl:max-w-full mx-auto px-4 sm:px-6 2xl:px-16">
      <div class="flex items-center justify-between h-16">
        <a href="${base}/" class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-md bg-gradient-to-br from-teal-500 via-teal-400 to-sky-300 flex items-center justify-center text-white font-semibold text-sm shadow">AM</div>
          <div>
            <div class="text-sm font-semibold text-slate-800">Dr. Astik Mane</div>
            <div class="hidden sm:block text-xs text-slate-400">Consultant Psychiatrist — Vile Parle, Mumbai</div>
          </div>
        </a>
        <nav class="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
          ${links.map(l => `<a href="${l.href}" class="hover:text-teal-600 transition ${activePage === l.label ? 'text-teal-600' : ''}">${l.label}</a>`).join('')}
          <a href="${base}/#contact" class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-sm">Book Appointment</a>
        </nav>
        <button id="mobileBtn" class="md:hidden p-2 rounded-md border border-slate-200">
          <svg id="menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg id="menuClose" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
    <div id="mobileMenu" class="md:hidden hidden border-t border-slate-100 bg-white/95">
      <div class="px-4 py-3 flex flex-col gap-2 text-sm">
        ${links.map(l => `<a href="${l.href}" class="py-2 text-slate-600">${l.label}</a>`).join('')}
        <a href="${base}/#contact" class="py-2 bg-teal-600 text-white rounded-lg text-center hover:bg-teal-700">Book Appointment</a>
      </div>
    </div>
  </header>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // mobile toggle
  const btn = document.getElementById('mobileBtn');
  const menu = document.getElementById('mobileMenu');
  const open = document.getElementById('menuOpen');
  const close = document.getElementById('menuClose');
  if (btn) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      open.classList.toggle('hidden');
      close.classList.toggle('hidden');
    });
  }
}

function injectFooter() {
  const footerHTML = `
  <footer class="bg-slate-900 text-slate-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div class="md:col-span-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-10 w-10 rounded-md bg-gradient-to-br from-teal-500 to-sky-400 flex items-center justify-center text-white font-semibold text-sm">AM</div>
          <div>
            <div class="text-white font-semibold">Dr. Astik Mane</div>
            <div class="text-xs text-slate-400">Consultant Psychiatrist</div>
          </div>
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">Near Irla Petrol Pump, Navpada, Irla, Vile Parle West, Mumbai 400056</p>
        <div class="flex gap-3 mt-5">
          <a href="tel:+917977396991" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition"><i class="fa-solid fa-phone text-sm"></i></a>
          <a href="https://wa.me/917977396991" target="_blank" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-green-600 transition"><i class="fa-brands fa-whatsapp text-sm"></i></a>
          <a href="mailto:astikmane@outlook.com" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition"><i class="fa-solid fa-envelope text-sm"></i></a>
        </div>
      </div>
      <div>
        <div class="text-xs font-semibold text-white uppercase tracking-widest mb-5">Quick Links</div>
        <ul class="space-y-3 text-sm">
          <li><a href="${base}/" class="hover:text-teal-400 transition">Home</a></li>
          <li><a href="${base}/blog.html" class="hover:text-teal-400 transition">Blog</a></li>
          <li><a href="${base}/conditions.html" class="hover:text-teal-400 transition">Conditions</a></li>
          <li><a href="${base}/resources.html" class="hover:text-teal-400 transition">Resources</a></li>
          <li><a href="${base}/#contact" class="hover:text-teal-400 transition">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="text-xs font-semibold text-white uppercase tracking-widest mb-5">Conditions</div>
        <ul class="space-y-3 text-sm">
          <li><a href="${base}/conditions/depression.html" class="hover:text-teal-400 transition">Depression</a></li>
          <li><a href="${base}/conditions/anxiety.html" class="hover:text-teal-400 transition">Anxiety</a></li>
          <li><a href="${base}/conditions/ocd.html" class="hover:text-teal-400 transition">OCD</a></li>
          <li><a href="${base}/conditions/adhd.html" class="hover:text-teal-400 transition">ADHD</a></li>
          <li><a href="${base}/conditions/bipolar.html" class="hover:text-teal-400 transition">Bipolar Disorder</a></li>
          <li><a href="${base}/conditions/dementia.html" class="hover:text-teal-400 transition">Dementia</a></li>
        </ul>
      </div>
      <div>
        <div class="text-xs font-semibold text-white uppercase tracking-widest mb-5">Contact</div>
        <div class="space-y-3 text-sm">
          <a href="tel:+917977396991" class="block hover:text-teal-400 transition">+91 79773 96991</a>
          <a href="mailto:astikmane@outlook.com" class="block hover:text-teal-400 transition break-all">astikmane@outlook.com</a>
          <div class="mt-4 p-3 bg-slate-800 rounded-xl">
            <div class="text-xs text-slate-400 mb-1">Clinic Hours</div>
            <div class="text-white text-sm font-medium">2 PM – 8 PM</div>
            <div class="text-teal-400 text-xs">Mon · Wed · Fri</div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
      <span>© <span class="footer-year"></span> Dr. Astik Mane. All rights reserved.</span>
      <span class="mx-2">·</span>
      <span>Website made with <span class="text-red-400">♥</span> by <a href="https://ajayjkr67.github.io/jaykron-portfolio/" target="_blank" class="hover:text-teal-400 transition">Jaykron</a></span>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
  document.querySelectorAll('.footer-year').forEach(el => el.textContent = new Date().getFullYear());
}
