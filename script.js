
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuOpen.classList.remove('hidden');
        menuClose.classList.add('hidden');
      }
    }
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  const icon = item.querySelector('.faq-icon');
  btn.addEventListener('click', () => {
    const isOpen = ans.style.maxHeight;
    document.querySelectorAll('.faq-a').forEach(a => {
      a.style.maxHeight = null;
      a.classList.add('opacity-0');
    });
    document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
    if (!isOpen) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
      ans.classList.remove('opacity-0');
      icon.textContent = '−';
    }
  });
});

// Contact form
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.textContent = 'Sending...';
    alertBox.classList.remove('hidden', '-translate-y-3');
    alertBox.classList.add('translate-y-0');
    const data = ['first_name', 'last_name', 'email', 'user_phone', 'message']
      .reduce((acc, id) => {
        acc[id] = document.getElementById(id).value.trim();
        return acc;
      }, {});
    if (!data.first_name || !data.email || !data.message) {
      alertBox.textContent = 'Please fill all required fields.';
      return;
    }
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Send failed');
      alertBox.textContent = 'Message sent. Clinic will contact you soon.';
      form.reset();
      setTimeout(() => {
        alertBox.classList.add('-translate-y-3');
        setTimeout(() => alertBox.classList.add('hidden'), 300);
      }, 3000);
    } catch (err) {
      console.error(err);
      alertBox.textContent = 'Failed to send. Please try WhatsApp or call.';
    }
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Treatments accordion
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.icon');
    const isOpen = content.style.maxHeight;
    document.querySelectorAll('.accordion-content').forEach(c => {
      c.style.maxHeight = null;
    });
    document.querySelectorAll('.icon').forEach(i => i.textContent = '+');
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.textContent = '−';
    }
  });
});

// Services data
const servicesData = {
  child: [
    {
      title: "Learning Disorder",
      img: "./images/learning_disorder.jpg",
      desc: "Learning disability refers to difficulty in skills like reading, writing, or mathematics despite normal intelligence. With early identification and support, children can learn effectively and build confidence."
    },
    {
      title: "Autism Spectrum Disorder",
      img: "./images/autism.jpg",
      desc: "Autism is a developmental condition affecting communication, social interaction, and behaviour. Early intervention and supportive therapies help individuals reach their full potential."
    },
    {
      title: "ADHD",
      img: "./images/adhd.jpg",
      desc: "ADHD causes problems with attention, impulsivity, and restlessness that affect academic and social functioning. Proper treatment helps children improve focus, behaviour, and self-esteem."
    }
  ],
  adult: [
    {
      title: "Anxiety",
      img: "./images/depression2.jpg",
      desc: "Anxiety involves excessive worry, fear, or nervousness that interferes with daily life. It is common and highly treatable with therapy, medication, and coping strategies."
    },
    {
      title: "Depression",
      img: "./images/depression.jpg",
      desc: "Depression causes persistent low mood, loss of interest, and reduced energy affecting daily functioning. It is a medical condition, not a weakness, and responds well to treatment."
    },
    {
      title: "OCD",
      img: "./images/ocd.jpg",
      desc: "OCD involves unwanted repetitive thoughts and compulsive behaviours performed to reduce anxiety. With appropriate treatment, people can gain good control over symptoms."
    }
  ],
  geriatric: [
    {
      title: "Dementia",
      img: "./images/dementia.jpg",
      desc: "Dementia leads to a gradual decline in memory, thinking, and daily functioning beyond normal ageing. Early diagnosis helps in planning care and improving quality of life."
    },
    {
      title: "Depression in Older Adults",
      img: "./images/depression_old.jpg",
      desc: "Depression in the elderly may present with sadness, withdrawal, or physical complaints. It is treatable and should not be considered a normal part of ageing."
    },
    {
      title: "Delirium",
      img: "./images/confusion.jpg",
      desc: "Delirium is a sudden state of confusion caused by medical illness, infections, or medications. It is a medical emergency and usually reversible when treated promptly."
    }
  ]
};

function renderServiceCards(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = data.map(item => `
    <article class="bg-white shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
      <img src="${item.img}" loading="lazy" decoding="async" class="w-full h-48 object-cover">
      <div class="p-5">
        <h3 class="font-semibold text-slate-800">${item.title}</h3>
        <p class="mt-2 text-sm text-slate-500 leading-relaxed">${item.desc}</p>
      </div>
    </article>
  `).join('');
}

renderServiceCards(servicesData.child, 'childServices');
renderServiceCards(servicesData.adult, 'adultServices');
renderServiceCards(servicesData.geriatric, 'geriatricServices');

// Animated counter on scroll
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = true;
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Nav active state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('text-teal-600');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-teal-600');
    }
  });
}, { passive: true });
