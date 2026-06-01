async function loadComponent(id,file){

    const response = await fetch(file);

    const html = await response.text();

    document.getElementById(id).innerHTML = html;
}

loadComponent("header","components/header.html");
loadComponent("hero","components/hero.html");
loadComponent("footer","components/footer.html");
// ============================================
// MAIN.JS - تهيئة جميع المكتبات والمكونات
// ============================================

// استيراد الوحدات
import './loader.js';
import './navbar.js';
import './counter.js';
import './swiper.js';
import './gallery.js';
import './form.js';
import './animations.js';
import './theme.js';

// تهيئة AOS (مكتبة الأنيميشن)
AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-quad'
});

// إخفاء شاشة التحميل بعد تحميل جميع المحتويات
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

// إعادة تهيئة AOS عند تحميل المكونات ديناميكياً
const observer = new MutationObserver(() => {
    AOS.refresh();
});

observer.observe(document.getElementById('header'), { childList: true, subtree: true });

// تحسين أداء التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// التحقق من دعم WebP للصور
function supportsWebP() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
}

// إضافة كلاس للمتصفحات التي لا تدعم WebP
if (!supportsWebP()) {
    document.body.classList.add('no-webp');
}
