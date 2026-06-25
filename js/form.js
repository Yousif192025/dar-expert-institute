/* form.js – form validation & submission */
(function(){
    function toast(msg){
        const d = document.createElement('div');
        d.style.cssText='position:fixed;top:90px;left:50%;transform:translateX(-50%);background:#0E7B5C;color:#fff;padding:14px 28px;border-radius:12px;font-family:Cairo,sans-serif;font-weight:700;font-size:14px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.3)';
        d.setAttribute('role','alert');
        d.textContent = msg;
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 4000);
    }
    document.getElementById('mainRegForm')?.addEventListener('submit', e => {
        e.preventDefault();
        e.target.checkValidity() ? (toast('✓ تم استقبال طلبك!'), e.target.reset()) : e.target.classList.add('was-validated');
    });
})();
