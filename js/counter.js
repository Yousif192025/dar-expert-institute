/* counter.js – Animated numeric counters */
(function(){
    function run(el){
        const target = parseInt(el.dataset.target, 10);
        const step = target / (1800 / 16);
        let cur = 0;
        const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.round(cur).toLocaleString('ar-SA');
            if(cur >= target) clearInterval(t);
        }, 16);
    }
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting){ run(e.target); obs.unobserve(e.target); } });
    }, { threshold: .4 });
    document.querySelectorAll('.counter').forEach(el => obs.observe(el));
})();
