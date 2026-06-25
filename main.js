/* ============================================================
   دار الخبراء | main.js – رئيسي موحّد 2026
   ============================================================ */

/* --- AOS --- */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 720, easing: 'ease-out-quad', once: true, offset: 80 });
    }
});

/* --- Loader --- */
window.addEventListener('load', () => {
    const l = document.getElementById('loader');
    if (l) setTimeout(() => l.classList.add('hidden'), 1200);
});
setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hidden');
}, 2800);

/* --- Navbar Scroll --- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* --- Active Nav Link --- */
const navLinks = document.querySelectorAll('.nav-link-dei[href^="#"]');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
}, { passive: true });

/* --- Smooth Scroll --- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

/* --- Mega Menu filter links --- */
document.querySelectorAll('.mega-link[data-filter]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const filter = link.getAttribute('data-filter');
        document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.querySelector(`.pf-btn[data-filter="${filter}"]`)?.click();
        }, 500);
    });
});

/* --- Theme Toggle --- */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('dei-theme') || 'light';
html.setAttribute('data-theme', saved);
if (themeBtn) themeBtn.innerHTML = saved === 'dark'
    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
    : '<i class="fas fa-moon" aria-hidden="true"></i>';

themeBtn?.addEventListener('click', () => {
    const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', t);
    localStorage.setItem('dei-theme', t);
    themeBtn.innerHTML = t === 'dark'
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
});

/* --- Counter Animation --- */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const step = target / (1800 / 16);
    let cur = 0;
    const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.round(cur).toLocaleString('ar-SA');
        if (cur >= target) clearInterval(timer);
    }, 16);
}
const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
    });
}, { threshold: 0.4 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

/* --- Programs Filter --- */
const pfBtns = document.querySelectorAll('.pf-btn');
const progItems = document.querySelectorAll('.prog-item');
pfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pfBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        progItems.forEach(item => {
            const match = filter === 'all' || item.getAttribute('data-category') === filter;
            item.style.transition = 'opacity .3s, transform .3s';
            if (match) {
                item.classList.remove('hidden');
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                setTimeout(() => item.classList.add('hidden'), 300);
            }
        });
    });
});

/* --- FAQ Accordion --- */
document.querySelectorAll('.faq-question').forEach(q => {
    const toggle = () => {
        const item = q.closest('.faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item.active').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) { item.classList.add('active'); q.setAttribute('aria-expanded', 'true'); }
    };
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
});

/* --- Form Submit Feedback --- */
function showToast(msg, success = true) {
    const div = document.createElement('div');
    div.style.cssText = `
        position:fixed;top:90px;left:50%;transform:translateX(-50%);
        background:${success ? '#0E7B5C' : '#C0392B'};color:#fff;
        padding:14px 28px;border-radius:12px;font-family:'Cairo',sans-serif;
        font-weight:700;font-size:14px;z-index:9999;
        box-shadow:0 8px 24px rgba(0,0,0,.3);animation:slide-down .4s ease;
    `;
    div.setAttribute('role', 'alert');
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

document.getElementById('mainRegForm')?.addEventListener('submit', e => {
    e.preventDefault();
    e.target.checkValidity()
        ? (showToast('✓ تم استقبال طلبك! سيتواصل معك فريقنا خلال 24 ساعة.'), e.target.reset())
        : e.target.classList.add('was-validated');
});

document.getElementById('quickRegForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
        showToast('✓ تم التسجيل بنجاح! سيتواصل معك مستشارنا قريباً.');
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('registerModal'))?.hide();
    } else {
        e.target.classList.add('was-validated');
    }
});

/* --- Close mobile nav on click --- */
document.querySelectorAll('#navMain .nav-link-dei, #navMain .btn-nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        const col = document.getElementById('navMain');
        bootstrap.Collapse.getInstance(col)?.hide();
    });
});
