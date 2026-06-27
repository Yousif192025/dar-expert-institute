/* theme.js – standalone Dark/Light toggle (إضافي) */
(function(){
    const h = document.documentElement;
    const t = localStorage.getItem('dei-theme') || 'light';
    h.setAttribute('data-theme', t);
})();

