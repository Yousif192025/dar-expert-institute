/* navbar.js – scroll behaviour */
(function(){
    const nb = document.getElementById('navbar');
    window.addEventListener('scroll', ()=> {
        nb && nb.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

