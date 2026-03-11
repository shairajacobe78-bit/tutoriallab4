// ── TYPING ANIMATION ──
const phrases = [
  "I'm a software developer",
  "I'm a web designer",
  "I'm a CS student",
  "I love building websites"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById('typing');

function type() {
  const word = phrases[phraseIndex];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}

type();

// ── SEND MESSAGE WITH EMAILJS ──
const sendBtn = document.getElementById('send-btn');
const formStatus = document.getElementById('form-status');

sendBtn.addEventListener('click', function () {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#e05a5a';
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }

  sendBtn.textContent = 'Sending...';
  sendBtn.disabled = true;
  formStatus.textContent = '';

  emailjs.send("service_igj1jfg", "template_ez4d9sc", {
    from_name:  name,
    from_email: email,
    message:    message,
    to_email:   "shairajacobe78@gmail.com"
  })
  .then(() => {
    sendBtn.textContent = 'Sent! ✓';
    formStatus.style.color = '#4a7fd4';
    formStatus.textContent = 'Your message was sent successfully!';
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
    setTimeout(() => {
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled = false;
      formStatus.textContent = '';
    }, 4000);
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    sendBtn.textContent = 'Send Message';
    sendBtn.disabled = false;
    formStatus.style.color = '#e05a5a';
    formStatus.textContent = 'Failed to send. Please try again.';
  });
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ── LIGHTBOX ──
function openLightbox(src, title) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = title;
  document.getElementById('gallery-controls').style.display = 'none';
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
  const img   = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  img.src = '';
  video.src = '';
  img.style.display   = 'block';
  video.style.display = 'none';
}

// ── VIDEO LIGHTBOX ──
function openVideo(src, title) {
  const img   = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  const controls = document.getElementById('gallery-controls');

  img.style.display   = 'none';
  video.style.display = 'block';
  controls.style.display = 'none';

  video.src = 'pitching.mp4';

  document.getElementById('lightbox-caption').textContent = title;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') galleryNav(1);
  if (e.key === 'ArrowLeft') galleryNav(-1);
});

// ── GALLERY (Project 4 - Brochure) ──
const galleryImages = [
  { src: 'project4.jpg',  label: 'BROCHURE 1/7' },
  { src: 'project4b.jpg', label: 'BROCHURE 2/7' },
  { src: 'project4c.jpg', label: 'BROCHURE 3/7' },
  { src: 'project4d.jpg', label: 'BROCHURE 4/7' },
  { src: 'project4e.jpg', label: 'BROCHURE 5/7' },
  { src: 'project4f.jpg', label: 'BROCHURE 6/7' },
  { src: 'project4g.jpg', label: 'BROCHURE 7/7' },
];

let galleryIndex = 0;

function openGallery() {
  galleryIndex = 0;
  updateGalleryView();
  document.getElementById('gallery-controls').style.display = 'flex';
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateGalleryView() {
  const item = galleryImages[galleryIndex];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-caption').textContent = item.label;
  document.getElementById('gallery-counter').textContent = (galleryIndex + 1) + ' / ' + galleryImages.length;
  document.getElementById('gallery-prev').style.opacity = galleryIndex === 0 ? '0.3' : '1';
  document.getElementById('gallery-next').style.opacity = galleryIndex === galleryImages.length - 1 ? '0.3' : '1';
}

function galleryNav(direction) {
  const newIndex = galleryIndex + direction;
  if (newIndex >= 0 && newIndex < galleryImages.length) {
    galleryIndex = newIndex;
    updateGalleryView();
  }
}

// ── LIGHT / DARK MODE TOGGLE ──
const themeBtn = document.getElementById('theme-toggle');

// Remember preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '☀';
} else {
  themeBtn.textContent = '☾';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☀' : '☾';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
