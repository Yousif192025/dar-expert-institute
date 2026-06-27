/* دار الخبراء | program-page.js 2026 */

// Dark mode (instant apply before render)
(function(){
  const t=localStorage.getItem('dei-theme')||'light';
  document.documentElement.setAttribute('data-theme',t);
})();

document.addEventListener('DOMContentLoaded',()=>{

  // AOS
  if(typeof AOS!=='undefined') AOS.init({duration:680,easing:'ease-out-quad',once:true,offset:70});

  // Loader
  window.addEventListener('load',()=>{const l=document.getElementById('loader');if(l)setTimeout(()=>l.classList.add('hidden'),700)});
  setTimeout(()=>{const l=document.getElementById('loader');if(l)l.classList.add('hidden')},2200);

  // Navbar scroll
  const nb=document.getElementById('navbar'),btt=document.getElementById('btt');
  window.addEventListener('scroll',()=>{
    nb&&nb.classList.toggle('scrolled',scrollY>60);
    btt&&btt.classList.toggle('vis',scrollY>400);
  },{passive:true});
  btt?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  // Theme toggle
  const tb=document.getElementById('themeBtn'),html=document.documentElement;
  const sv=localStorage.getItem('dei-theme')||'light';
  if(tb) tb.innerHTML=sv==='dark'?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
  tb?.addEventListener('click',()=>{
    const t=html.getAttribute('data-theme')==='dark'?'light':'dark';
    html.setAttribute('data-theme',t);
    localStorage.setItem('dei-theme',t);
    tb.innerHTML=t==='dark'?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  }));

  // Curriculum accordion
  document.querySelectorAll('.curr-module').forEach(m=>{
    m.querySelector('.curr-hd')?.addEventListener('click',()=>{
      const isOpen=m.classList.contains('open');
      document.querySelectorAll('.curr-module.open').forEach(x=>x.classList.remove('open'));
      if(!isOpen) m.classList.add('open');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const it=q.closest('.faq-item'),was=it.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
      if(!was) it.classList.add('open');
    });
  });

  // Tab switcher
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const tab=btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-'+tab)?.classList.add('active');
    });
  });

  // Toast
  window.showToast=function(msg,type='success'){
    const d=document.createElement('div');
    d.style.cssText=`position:fixed;top:88px;left:50%;transform:translateX(-50%);
      background:${type==='success'?'#0E7B5C':'#DC2626'};color:#fff;
      padding:13px 26px;border-radius:11px;font-family:Cairo,sans-serif;
      font-weight:700;font-size:14px;z-index:9999;
      box-shadow:0 8px 24px rgba(0,0,0,.3);animation:fadein .3s ease`;
    d.setAttribute('role','alert');d.textContent=msg;
    document.body.appendChild(d);setTimeout(()=>d.remove(),4000);
  };

  // Enroll buttons
  document.querySelectorAll('.btn-enroll,.btn-enroll-modal').forEach(b=>{
    b.addEventListener('click',e=>{
      if(b.tagName==='A') return;
      e.preventDefault();
      const modal=document.getElementById('enrollModal');
      if(modal) new bootstrap.Modal(modal).show();
    });
  });

  // Enroll form
  document.getElementById('enrollForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    if(e.target.checkValidity()){
      bootstrap.Modal.getInstance(document.getElementById('enrollModal'))?.hide();
      showToast('✓ تم استقبال طلبك! سيتواصل معك فريقنا خلال 24 ساعة.');
      e.target.reset();
    } else e.target.classList.add('was-validated');
  });

  // Close mobile nav on link click
  document.querySelectorAll('#navMain .nav-lnk,#navMain .btn-nav-cta').forEach(l=>
    l.addEventListener('click',()=>bootstrap.Collapse.getInstance(document.getElementById('navMain'))?.hide())
  );

  // Open first curriculum module
  document.querySelector('.curr-module')?.classList.add('open');
  // Open first FAQ
  document.querySelector('.faq-item')?.classList.add('open');
});
